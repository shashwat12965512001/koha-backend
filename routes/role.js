import express from 'express';
import Role from '../models/Role.js';
import Permission from '../models/Permission.js';

const router = express.Router();

// @route   POST /api/roles/add
// @desc    Add a new role
router.post('/add', async (req, res) => {
    try {
        const { name, permissions, description } = req.body;

        // Check for duplicate role
        const existing = await Role.findOne({ name });
        if (existing) {
            return res.status(400).json({ error: 'Role already exists' });
        }

        // 🔄 Convert permission names to ObjectIds
        const permissionDocs = await Permission.find({
            name: { $in: permissions }
        });

        const permissionIds = permissionDocs.map(p => p._id);

        const newRole = new Role({
            name,
            permissions: permissionIds,
            description,
        });

        const savedRole = await newRole.save();
        const populatedRole = await savedRole.populate('permissions');
        res.status(201).json({ message: 'Role added successfully', role: populatedRole });
    } catch (err) {
        console.error('Error adding role:', err.message);
        res.status(500).json({ error: 'Failed to add role' });
    }
});

// @route   GET /api/roles/all
// @desc    Get all roles
router.get('/all', async (req, res) => {
    try {
        const roles = await Role.find().populate('permissions');
        res.status(200).json(roles);
    } catch (err) {
        console.error('Error fetching roles:', err.message);
        res.status(500).json({ error: 'Failed to fetch roles' });
    }
});

// @route   DELETE /api/roles/:id
// @desc    Delete a role by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.id);
        if (!deletedRole) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.json({ message: 'Role deleted successfully', role: deletedRole });
    } catch (err) {
        console.error('Error deleting role:', err.message);
        res.status(500).json({ error: 'Failed to delete role' });
    }
});

// @route   PUT /api/role/:id/update-permissions
// @desc    Update permissions of a role
router.put('/:id/update-permissions', async (req, res) => {
    try {
        const { permissions } = req.body;

        // Convert permission names to ObjectIds
        const permissionDocs = await Permission.find({ name: { $in: permissions } });
        const permissionIds = permissionDocs.map(p => p._id);

        const updatedRole = await Role.findByIdAndUpdate(
            req.params.id,
            { permissions: permissionIds },
            { new: true }
        ).populate('permissions');

        res.status(200).json({ message: 'Permissions updated', role: updatedRole });
    } catch (err) {
        console.error('Error updating permissions:', err.message);
        res.status(500).json({ error: 'Failed to update permissions' });
    }
});

export default router;