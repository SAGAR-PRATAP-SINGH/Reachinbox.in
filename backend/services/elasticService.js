const { client } = require('../config/elasticsearch');

async function indexEmail(email) {
    try {
        await client.index({
            index: 'emails',
            body: {
                subject: email.subject,
                from: email.from,
                body: email.body,
                date: email.date,
                category: email.category,
                accountId: email.accountId,
                folder: email.folder,
                uid: email.uid
            }
        });
    } catch (error) {
        console.error('Elasticsearch indexing error:', error);
        throw error;
    }
}

async function searchEmails(query) {
    try {
        const result = await client.search({
            index: 'emails',
            body: {
                query: {
                    multi_match: {
                        query: query,
                        fields: ['subject', 'body', 'from']
                    }
                }
            }
        });
        return result.body.hits.hits;
    } catch (error) {
        console.error('Elasticsearch search error:', error);
        throw error;
    }
}

module.exports = { indexEmail, searchEmails };