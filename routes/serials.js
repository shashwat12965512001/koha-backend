import express from 'express';
import Serial from '../models/Serial.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const serial = new Serial(req.body);
        await serial.save();
        res.status(201).json({ message: 'Serial added successfully', serial });
    } catch (error) {
        console.error("Error adding serial:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const serials = await Serial.find().sort({ createdAt: -1 });;
        res.status(200).json(serials);
    } catch (error) {
        console.error("Error fetching serials:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;