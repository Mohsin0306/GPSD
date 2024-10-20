// routes/quickLinkRoutes.js
const express = require('express');
const router = express.Router();
const QuickLink = require('../models/QuickLink');

// Get all quick links
router.get('/', async (req, res) => {
    try {
        const quickLinks = await QuickLink.find();
        res.json(quickLinks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new quick link
router.post('/', async (req, res) => {
    const quickLink = new QuickLink(req.body);
    try {
        const savedQuickLink = await quickLink.save();
        res.status(201).json(savedQuickLink);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a quick link
router.delete('/:id', async (req, res) => {
    try {
        const deletedQuickLink = await QuickLink.findByIdAndDelete(req.params.id);
        res.json(deletedQuickLink);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
