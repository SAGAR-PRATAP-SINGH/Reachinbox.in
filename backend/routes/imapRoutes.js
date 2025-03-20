const express = require('express');
const router = express.Router();
const ImapService = require('../services/imapService');
const Account = require('../models/Account');
const Email = require('../models/Email');

// GET all emails route
router.get('/', async (req, res) => {
    try {
        console.log('Fetching emails...');
        const emails = await Email.find({}).sort({ date: -1 });
        console.log(`Found ${emails.length} emails`);
        res.json(emails);
    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({ error: error.message });
    }
});

// Add test route to verify API
router.get('/test', (req, res) => {
    res.json({ message: 'Email routes working' });
});

router.post('/sync', async (req, res) => {
    try {
        const imapService = new ImapService(req.body);
        await imapService.connectAndSync();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/accounts', async (req, res) => {
    try {
        const accounts = await Account.find({});
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/accounts', async (req, res) => {
    try {
        const account = new Account(req.body);
        await account.save();
        res.status(201).json(account);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;