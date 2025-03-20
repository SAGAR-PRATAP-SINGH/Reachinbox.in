const express = require('express');
const router = express.Router();
const { generateReply, categorizeEmail } = require('../services/aiService');
const Email = require('../models/Email');

router.get('/suggest-reply/:emailId', async (req, res) => {
    try {
        const email = await Email.findById(req.params.emailId);
        if (!email) {
            return res.status(404).json({ error: 'Email not found' });
        }
        const suggestedReply = await generateReply(email);
        res.json({ reply: suggestedReply });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/categorize', async (req, res) => {
    try {
        const { emailId } = req.body;
        const email = await Email.findById(emailId);
        const category = await categorizeEmail(email);
        await Email.findByIdAndUpdate(emailId, { category });
        res.json({ category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;