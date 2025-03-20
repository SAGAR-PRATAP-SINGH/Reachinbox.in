const Imap = require('node-imap');
const { simpleParser } = require('mailparser');
const { indexEmail } = require('./elasticService');
const { categorizeEmail } = require('./aiService');
const { notifySlack } = require('./slackService');
const Email = require('../models/Email');

class ImapService {
    constructor(config) {
        this.imap = new Imap({
            user: config.email,
            password: config.password,
            host: config.host,
            port: config.port,
            tls: true
        });
    }

    async connectAndSync() {
        return new Promise((resolve, reject) => {
            this.imap.once('ready', () => {
                this.syncEmails().then(resolve).catch(reject);
            });

            this.imap.once('error', (err) => {
                reject(err);
            });

            this.imap.connect();
        });
    }

    async syncEmails() {
        try {
            await this.openInbox();
            const messages = await this.fetchLastMonthEmails();
            
            for (const msg of messages) {
                const parsedEmail = await simpleParser(msg.body);
                const category = await categorizeEmail(parsedEmail);
                
                const emailDoc = new Email({
                    subject: parsedEmail.subject,
                    from: parsedEmail.from.text,
                    to: parsedEmail.to.text,
                    body: parsedEmail.text,
                    date: parsedEmail.date,
                    category,
                    uid: msg.uid
                });

                await emailDoc.save();
                await indexEmail(emailDoc);
                
                if (category === 'Interested') {
                    await notifySlack(emailDoc);
                }
            }
        } catch (error) {
            console.error('Sync error:', error);
            throw error;
        }
    }

    async openInbox() {
        return new Promise((resolve, reject) => {
            this.imap.openBox('INBOX', false, (err, box) => {
                if (err) reject(err);
                else resolve(box);
            });
        });
    }

    async fetchLastMonthEmails() {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        return new Promise((resolve, reject) => {
            this.imap.search([['SINCE', thirtyDaysAgo]], (err, results) => {
                if (err) reject(err);
                else resolve(this.fetchEmailData(results));
            });
        });
    }
}

module.exports = ImapService;