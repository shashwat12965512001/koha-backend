import mongoose from 'mongoose';

const acquisitionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authors: { type: String },
    publisher: { type: String },
    publicationYear: { type: Number },
    isbn: { type: String },
    edition: { type: String },
    category: { type: String },
    language: { type: String },
    format: { type: String },
    vendor: { type: String },
    invoiceNumber: { type: String },
    acquisitionDate: { type: Date },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalCost: { type: Number },
    shelfLocation: { type: String },
    notes: { type: String }
}, {
    timestamps: true
});

export default mongoose.model("Acquisition", acquisitionSchema);
