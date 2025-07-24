import express from 'express';
import Inventory from '../models/Inventory.js';

const router = express.Router();

// @route   POST /api/inventory/add
// @desc    Add new inventory/book
router.post('/add', async (req, res) => {
    try {
        const newBook = new Inventory(req.body);
        const saved = await newBook.save();
        res.status(201).json({ message: 'Inventory book added successfully', book: saved });
    } catch (err) {
        console.error('Error adding inventory:', err.message);
        res.status(500).json({ error: 'Something went wrong while adding inventory.' });
    }
});

// @route   GET /api/inventory/all
// @desc    Get all inventory books
router.get('/all', async (req, res) => {
    try {
        const books = await Inventory.find().sort({ createdAt: -1 }); // newest first
        res.status(200).json(books);
    } catch (err) {
        console.error('Error fetching inventory:', err.message);
        res.status(500).json({ error: 'Failed to retrieve inventory.' });
    }
});

// @route   DELETE /api/inventory/:id
// @desc    Delete an inventory/book by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Inventory.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        console.error('Error deleting inventory:', err.message);
        res.status(500).json({ error: 'Something went wrong while deleting inventory.' });
    }
});

export default router;