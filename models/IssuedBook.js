import mongoose from 'mongoose';

const issuedBookSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // assuming your student model is "User"
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
}, {
    timestamps: true
});

export default mongoose.model('IssuedBook', issuedBookSchema);