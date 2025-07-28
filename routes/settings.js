import express from "express";
import Settings from "../models/Settings.js";

const router = express.Router();

// POST - Save or Update Settings
router.post("/save", async (req, res) => {
    try {
        const existing = await Settings.findOne();

        if (existing) {
            const updated = await Settings.findByIdAndUpdate(existing._id, req.body, { new: true });
            return res.status(200).json({ message: "Settings updated", settings: updated });
        }

        const newSettings = new Settings(req.body);
        const saved = await newSettings.save();
        res.status(201).json({ message: "Settings saved", settings: saved });
    } catch (err) {
        console.error("Save settings error:", err);
        res.status(500).json({ error: "Failed to save settings" });
    }
});

// GET all settings
router.get('/', async (req, res) => {
    try {
        const settings = await Settings.findOne(); // assuming only one settings document
        res.json(settings);
    } catch (err) {
        console.error('Failed to fetch settings:', err);
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
});

export default router;