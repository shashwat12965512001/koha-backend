import express from 'express';
import Permission from '../models/Permission.js';

const router = express.Router();

// Add new permission
router.post('/add', async (req, res) => {
    try {
        const permission = new Permission({ name: req.body.name });
        const saved = await permission.save();
        res.status(201).json({ permission: saved });
    } catch (err) {
        res.status(500).json({ error: 'Error adding permission' });
    }
});

// Get all permissions
router.get('/all', async (req, res) => {
    try {
        const permissions = await Permission.find();
        res.status(200).json(permissions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch permissions' });
    }
});

// Delete a permission
router.delete('/:id', async (req, res) => {
    try {
        await Permission.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Permission deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete permission' });
    }
});

export default router;