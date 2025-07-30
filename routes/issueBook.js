import express from 'express';
import IssuedBook from '../models/IssuedBook.js';
import Inventory from '../models/Inventory.js';

const router = express.Router();

// @route   POST /api/add
// @desc    Issue a book to a student
router.post('/add', async (req, res) => {
    try {
        const { studentId, inventoryId, dueDate } = req.body;

        // 1. Check if inventory book exists
        const book = await Inventory.findById(inventoryId);
        if (!book) return res.status(404).json({ error: 'Book not found in inventory' });

        // 2. Check if book is available
        if (book.status !== 'Available') {
            return res.status(400).json({ error: 'Book is currently not available for issue' });
        }

        // 3. Create issued record
        const issue = new IssuedBook({
            studentId,
            bookId: inventoryId,
            dueDate
        });
        await issue.save();

        // 4. Update book status in inventory
        book.status = 'Issued';
        await book.save();

        res.status(201).json({ message: 'Book issued successfully', issue });
    } catch (error) {
        console.error('Error in issuing book:', error);
        res.status(500).json({ error: 'Something went wrong while issuing the book.' });
    }
});

// @route   GET /api/issue/all
// @desc    Get all issued books with book details
router.get('/all/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;

        const issuedBooks = await IssuedBook.find({ studentId })
            .populate({
                path: 'bookId',
                model: 'Inventory', // make sure Inventory is the model name
                select: 'title authors coverImageUrl status' // or leave blank to fetch all
            })
            .populate({
                path: 'studentId',
                model: 'Patron', // if you have a student model
                select: 'fullName email cardNumber' // optional
            })
            .sort({ issuedAt: -1 });

        res.status(200).json(issuedBooks);
    } catch (err) {
        console.error('Error fetching issued books:', err.message);
        res.status(500).json({ error: 'Failed to retrieve issued books' });
    }
});

// @route   GET /api/issue/count/:studentId
// @desc    Count issued books for a student
// @access  Public
router.get('/count/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;

        const count = await IssuedBook.countDocuments({ studentId });

        res.status(200).json({ count });
    } catch (err) {
        console.error('Error counting issued books:', err.message);
        res.status(500).json({ error: 'Failed to count issued books' });
    }
});

export default router;