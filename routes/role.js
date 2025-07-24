import express from 'express';
import Role from '../models/Role.js';

const router = express.Router();

// @route   POST /api/roles/add
// @desc    Add a new role
router.post('/add', async (req, res) => {
    try {
        const { name, permissions, description } = req.body;

        // Optional: Prevent duplicate roles
        const existing = await Role.findOne({ name });
        if (existing) {
            return res.status(400).json({ error: 'Role already exists' });
        }

        const newRole = new Role({
            name,
            permissions,
            description,
        });

        const savedRole = await newRole.save();
        res.status(201).json({ message: 'Role added successfully', role: savedRole });
    } catch (err) {
        console.error('Error adding role:', err.message);
        res.status(500).json({ error: 'Failed to add role' });
    }
});

router.get('/all', async (req, res) => {
    const roles = await Role.find().populate('permissions');
    res.json(roles);
});

export default router;