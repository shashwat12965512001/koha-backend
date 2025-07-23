import mongoose from "mongoose";

const SerialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    issn: {
        type: String,
        required: false, // Not all serials have ISSNs
    },
    publisher: {
        type: String,
    },
    frequency: {
        type: String,
        enum: ['Daily', 'Weekly', 'Biweekly', 'Monthly', 'Quarterly', 'Annually', 'Irregular'],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    subscriptionNumber: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    vendor: {
        type: String,
        required: true,
    },
    language: {
        type: String,
    },
    notes: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Suspended', 'Cancelled'],
        default: 'Active',
    },
    lastIssueDate: {
        type: Date,
    },
    nextIssueDate: {
        type: Date,
    },
}, { timestamps: true });

const Serial = mongoose.model('Serial', SerialSchema);
export default Serial;