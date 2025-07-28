import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
    libraryName: String,
    contactEmail: String,
    address: String,
    openingTime: String,
    closingTime: String,

    // Notification Settings
    emailNotifications: Boolean,
    dueDateReminders: Boolean,
    whatsappAlerts: Boolean,
    weeklyDigest: Boolean,

    // AI Preferences
    aiRecommendations: Boolean,
    academicSuggestions: Boolean,
    aiSummaries: Boolean,

    // User Experience
    autoRenew: Boolean,
    darkMode: Boolean,
    showBookCovers: Boolean,
    saveFilters: Boolean,

    // Privacy
    privacyMode: Boolean,
    hideReadingHistory: Boolean,
    autoClearHistory: Boolean,

    // Circulation
    studentLimit: Number,
    facultyLimit: Number,
    loanDays: Number,
    finePerDay: Number,
    blockAfterFine: Number,
    blockAfterOverdue: Number
}, { timestamps: true });

export default mongoose.model("Settings", SettingsSchema);