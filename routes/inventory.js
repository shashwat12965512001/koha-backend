import express from 'express';
import multer from 'multer';
import path from 'path';
import Inventory from '../models/Inventory.js';

const router = express.Router();

// Storage config for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Make sure this folder exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// @route   POST /api/inventory/add
// @desc    Add new inventory/book with cover image
router.post('/add', upload.single('coverImage'), async (req, res) => {
    try {
        const {
            title, authors, publisher, publicationYear, isbn,
            edition, category, language, format, vendor,
            invoiceNumber, acquisitionDate, quantity, unitPrice,
            totalCost, shelfLocation, callNumber, accessionNumber,
            barcode, status, notes
        } = req.body;

        const coverImageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        const newBook = new Inventory({
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
            callNumber,
            accessionNumber,
            barcode,
            status,
            notes,
            coverImageUrl
        });

        const saved = await newBook.save();
        res.status(201).json({ message: 'Inventory book added successfully', book: saved });
    } catch (err) {
        console.error('Error adding inventory:', err.message);
        res.status(500).json({ error: 'Something went wrong while adding inventory.' });
    }
});

// @route   GET /api/inventory/all?page=1&limit=10
// @desc    Get all inventory books
router.get('/all', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const books = await Inventory.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await Inventory.countDocuments();

        res.status(200).json({
            books,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
        });
    } catch (err) {
        console.error('Error fetching paginated inventory:', err.message);
        res.status(500).json({ error: 'Failed to retrieve paginated inventory.' });
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