import express from 'express';
import Acquisition from '../models/Acquisition.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const {
            title,
            authors,
            publisher,
            publicationYear,
            isbn,
            edition,
            category,
            language,
            format,
            vendor,
            invoiceNumber,
            acquisitionDate,
            quantity,
            unitPrice,
            shelfLocation,
            notes
        } = req.body;
        const totalCost = quantity * unitPrice;
        const newAcquisition = new Acquisition({
            title,
            authors,
            publisher,
            publicationYear,
            isbn,
            edition,
            category,
            language,
            format,
            vendor,
            invoiceNumber,
            acquisitionDate,
            quantity,
            unitPrice,
            totalCost,
            shelfLocation,
            notes
        });
        await newAcquisition.save();
        res.status(201).json({ message: "Acquisition added successfully", acquisition: newAcquisition });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const acquisitions = await Acquisition.find().sort({ createdAt: -1 });
        res.status(200).json(acquisitions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch acquisitions" });
    }
});

export default router;