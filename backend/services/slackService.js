const { IncomingWebhook } = require('@slack/webhook');

const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

async function notifySlack(email) {
    try {
        await webhook.send({
            text: 'New Interested Email!',
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*New Interested Email*\nFrom: ${email.from}\nSubject: ${email.subject}`
                    }
                }
            ]
        });
    } catch (error) {
        console.error('Slack notification error:', error);
    }
}

module.exports = { notifySlack };