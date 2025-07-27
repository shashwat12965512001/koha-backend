import express from 'express';
import Patron from '../models/Patron.js';

const router = express.Router();

// @route   POST /api/patrons/add
// @desc    Add a new library patron
router.post('/add', async (req, res) => {
    try {
        const {
            fullName,
            cardNumber,
            dob,
            gender,
            email,
            phone,
            address,
            category,
            department,
            registrationDate,
            expiryDate,
            username,
            password,
            notes,
            status = 'Active'
        } = req.body;

        // Optional: Check for duplicate card number or username
        const existing = await Patron.findOne({ $or: [{ cardNumber }, { username }] });
        if (existing) {
            return res.status(400).json({ error: 'Card number or username already exists' });
        }

        const newPatron = new Patron({
            fullName,
            cardNumber,
            dob,
            gender,
            email,
            phone,
            address,
            category,
            department,
            registrationDate,
            expiryDate,
            username,
            password,
            notes,
            status
        });

        const savedPatron = await newPatron.save();
        res.status(201).json({ message: 'Patron added successfully', patron: savedPatron });
    } catch (err) {
        console.error('Error adding patron:', err.message);
        res.status(500).json({ error: 'Failed to add patron' });
    }
});

// @route   GET /api/patrons/all
// @desc    Fetch all library patrons
router.get('/all', async (req, res) => {
    try {
        const patrons = await Patron.find().sort({ fullName: 1 }); // Optional: sort alphabetically
        res.status(200).json(patrons);
    } catch (err) {
        console.error('Error fetching patrons:', err.message);
        res.status(500).json({ error: 'Failed to fetch patrons' });
    }
});

router.patch('/block/:id', async (req, res) => {
    try {
        const patron = await Patron.findByIdAndUpdate(
            req.params.id,
            { status: 'Blocked' },
            { new: true }
        );

        if (!patron) return res.status(404).json({ error: 'Patron not found' });

        res.status(200).json({ message: 'Patron blocked successfully', patron });
    } catch (err) {
        res.status(500).json({ error: 'Failed to block patron' });
    }
});

// PATCH /api/patrons/unblock/:id
router.patch('/unblock/:id', async (req, res) => {
    try {
        const patron = await Patron.findByIdAndUpdate(
            req.params.id,
            { status: 'Active' },
            { new: true }
        );

        if (!patron) return res.status(404).json({ error: 'Patron not found' });

        res.status(200).json({ message: 'Patron unblocked successfully', patron });
    } catch (err) {
        console.error('Error unblocking patron:', err.message);
        res.status(500).json({ error: 'Failed to unblock patron' });
    }
});

// DELETE /api/patrons/delete/:id
router.delete('/delete/:id', async (req, res) => {
    try {
        const deleted = await Patron.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Patron not found' });
        res.status(200).json({ message: 'Patron deleted successfully' });
    } catch (err) {
        console.error('Error deleting patron:', err.message);
        res.status(500).json({ error: 'Failed to delete patron' });
    }
});

export default router;