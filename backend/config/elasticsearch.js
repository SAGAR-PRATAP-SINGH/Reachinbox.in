const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    node: process.env.ELASTICSEARCH_NODE
});

const initializeElasticsearch = async () => {
    try {
        await client.indices.create({
            index: 'emails',
            body: {
                mappings: {
                    properties: {
                        subject: { type: 'text' },
                        body: { type: 'text' },
                        from: { type: 'keyword' },
                        date: { type: 'date' },
                        category: { type: 'keyword' },
                        accountId: { type: 'keyword' },
                        folder: { type: 'keyword' }
                    }
                }
            }
        }, { ignore: [400] });
    } catch (error) {
        console.error('Elasticsearch initialization error:', error);
    }
};

module.exports = { client, initializeElasticsearch };