const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donor_id: {
        type: String,
        required: true
    },
    center_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    sample_id: {
        type: String,
        required: true
    }
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
