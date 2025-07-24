import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    authors: String,
    publisher: String,
    publicationYear: Number,
    isbn: String,
    edition: String,
    category: String,
    language: String,
    format: String,
    vendor: String,
    invoiceNumber: String,
    acquisitionDate: Date,
    quantity: { type: Number, required: true },
    unitPrice: Number,
    totalCost: Number,
    shelfLocation: String,
    callNumber: String,
    accessionNumber: String,
    barcode: String,
    status: {
        type: String,
        enum: ['Available', 'Issued', 'Lost', 'Damaged'],
        default: 'Available'
    },
    notes: String,
}, { timestamps: true });

const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;