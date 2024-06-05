// models/BloodSample.js

const mongoose = require('mongoose');

const bloodUsageSchema = new mongoose.Schema({
    donor_id: {
        type: String,
        required: true
    },
    center_id: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const BloodUsage = mongoose.model('Usage', bloodUsageSchema);

module.exports = BloodUsage;
