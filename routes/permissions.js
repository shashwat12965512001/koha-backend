import express from 'express';
import Permission from '../models/Permission.js';

const router = express.Router();

// @route   POST /api/permissions/add
// @desc    Add a new permission
router.post('/add', async (req, res) => {
    try {
        const { name, description, category } = req.body;

        // Check for duplicate
        const existing = await Permission.findOne({ name });
        if (existing) {
            return res.status(400).json({ error: 'Permission already exists' });
        }

        const permission = new Permission({ name, description, category });
        const saved = await permission.save();

        res.status(201).json({ message: 'Permission added successfully', permission: saved });
    } catch (err) {
        console.error('Error adding permission:', err.message);
        res.status(500).json({ error: 'Error adding permission' });
    }
});

// @route   GET /api/permissions/all
// @desc    Get all permissions
router.get('/all', async (req, res) => {
    try {
        const permissions = await Permission.find().sort({ category: 1, name: 1 });
        res.status(200).json(permissions);
    } catch (err) {
        console.error('Error fetching permissions:', err.message);
        res.status(500).json({ error: 'Failed to fetch permissions' });
    }
});

// @route   DELETE /api/permissions/:id
// @desc    Delete a permission
router.delete('/:id', async (req, res) => {
    try {
        await Permission.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Permission deleted' });
    } catch (err) {
        console.error('Error deleting permission:', err.message);
        res.status(500).json({ error: 'Failed to delete permission' });
    }
});

export default router;