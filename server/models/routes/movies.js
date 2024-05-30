// routes/movies.js
const express = require('express');
const auth = require('../middleware/auth');
const List = require('../models/List');

const router = express.Router();

// Create List
router.post('/list', auth, async (req, res) => {
    const { name, movies, isPublic } = req.body;
    try {
        const list = new List({ name, movies, isPublic, user: req.user.id });
        await list.save();
        res.status(201).json(list);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get User Lists
router.get('/list', auth, async (req, res) => {
    try {
        const lists = await List.find({ user: req.user.id });
        res.json(lists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Public List by ID
router.get('/list/:id', async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        if (list.isPublic) {
            res.json(list);
        } else {
            res.status(403).json({ message: 'This list is private' });
        }
    } catch (error) {
        res.status(404).json({ message: 'List not found' });
    }
});

module.exports = router;
