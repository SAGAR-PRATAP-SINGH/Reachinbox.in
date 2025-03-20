const express = require('express');
const router = express.Router();
const { client } = require('../config/elasticsearch');
const Email = require('../models/Email');

router.get('/', async (req, res) => {
    try {
        const { q, account, folder } = req.query;
        const query = {
            bool: {
                must: [
                    q ? { multi_match: { query: q, fields: ['subject', 'body'] } } : { match_all: {} }
                ],
                filter: [
                    account ? { term: { accountId: account } } : null,
                    folder ? { term: { folder: folder } } : null
                ].filter(Boolean)
            }
        };

        const result = await client.search({
            index: 'emails',
            body: { query }
        });

        res.json(result.body.hits.hits.map(hit => ({
            ...hit._source,
            score: hit._score
        })));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;