import mongoose from 'mongoose';

const patronSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    cardNumber: { type: String, required: true, unique: true },
    dob: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    category: { type: String }, // e.g., Student, Faculty, Staff
    department: { type: String },
    registrationDate: { type: Date, default: Date.now },
    expiryDate: { type: Date },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // You should hash this in production
    status: {
        type: String,
        enum: ['Active', 'Blocked'],
        default: 'Active'
    },
    notes: { type: String }
});

const Patron = mongoose.model('Patron', patronSchema);

export default Patron;