// routes/achievementRoutes.js
const express = require('express');
const Achievement = require('../models/Achievements');

const router = express.Router();

// GET all achievements
router.get('/', async (req, res) => {
    try {
        const achievements = await Achievement.find();
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new achievement
router.post('/', async (req, res) => {
    const achievement = new Achievement({
        title: req.body.title,
        description: req.body.description,
    });

    try {
        const newAchievement = await achievement.save();
        res.status(201).json(newAchievement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE an achievement
router.delete('/:id', async (req, res) => {
    try {
        const deletedAchievement = await Achievement.findByIdAndDelete(req.params.id);
        if (!deletedAchievement) {
            return res.status(404).json({ message: 'Achievement not found' });
        }
        res.status(200).json({ message: 'Achievement deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
