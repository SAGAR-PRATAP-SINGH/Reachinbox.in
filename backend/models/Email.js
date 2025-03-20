const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    subject: String,
    from: String,
    to: String,
    body: String,
    date: Date,
    category: {
        type: String,
        enum: ['Interested', 'Meeting Booked', 'Not Interested', 'Spam', 'Out of Office']
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    folder: String,
    uid: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Email', emailSchema);