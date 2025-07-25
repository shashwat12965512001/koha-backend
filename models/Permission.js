import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // e.g. manageUsers
    description: { type: String, required: true },         // e.g. Add, update, delete users
    category: { type: String, required: true }             // e.g. User & Role Management
});

const Permission = mongoose.model('Permission', permissionSchema);
export default Permission;