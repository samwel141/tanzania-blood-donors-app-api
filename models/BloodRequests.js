const mongoose = require('mongoose');

const bloodGroupSchema = new mongoose.Schema({
    stock: {
        adult: { type: Number, required: true },
        pediatric: { type: Number, required: true }
    },
    requested: {
        adult: { type: Number, required: true },
        pediatric: { type: Number, required: true }
    },
    issued: {
        adult: { type: Number, required: true },
        pediatric: { type: Number, required: true }
    },
    total: { type: Number, required: true },
    remarks: { type: String }
});

const basicInfoSchema = new mongoose.Schema({
    total_requested: { type: Number, required: true },
    total_expired: { type: Number, required: true },
    name_of_requester: { type: String, required: true },
    designation_of_requester: { type: String, required: true },
    name_of_approver: { type: String, required: true },
    designation_of_approver: { type: String, required: true },
});

const bloodRequestSchema = new mongoose.Schema({
    center_id: { type: String },
    status: { type: String, default: 'pending' },
    basic_info: { type: basicInfoSchema, required: true },
    whole_blood: {
        a_pos: { type: bloodGroupSchema },
        a_neg: { type: bloodGroupSchema },
        b_pos: { type: bloodGroupSchema },
        b_neg: { type: bloodGroupSchema },
        ab_pos: { type: bloodGroupSchema },
        ab_neg: { type: bloodGroupSchema },
        o_pos: { type: bloodGroupSchema },
        o_neg: { type: bloodGroupSchema }
    },
    prc: {
        a_pos: { type: bloodGroupSchema },
        a_neg: { type: bloodGroupSchema },
        b_pos: { type: bloodGroupSchema },
        b_neg: { type: bloodGroupSchema },
        ab_pos: { type: bloodGroupSchema },
        ab_neg: { type: bloodGroupSchema },
        o_pos: { type: bloodGroupSchema },
        o_neg: { type: bloodGroupSchema }
    },
    ffp: {
        a_pos: { type: bloodGroupSchema },
        a_neg: { type: bloodGroupSchema },
        b_pos: { type: bloodGroupSchema },
        b_neg: { type: bloodGroupSchema },
        ab_pos: { type: bloodGroupSchema },
        ab_neg: { type: bloodGroupSchema },
        o_pos: { type: bloodGroupSchema },
        o_neg: { type: bloodGroupSchema }
    },
    plt: {
        a_pos: { type: bloodGroupSchema },
        a_neg: { type: bloodGroupSchema },
        b_pos: { type: bloodGroupSchema },
        b_neg: { type: bloodGroupSchema },
        ab_pos: { type: bloodGroupSchema },
        ab_neg: { type: bloodGroupSchema },
        o_pos: { type: bloodGroupSchema },
        o_neg: { type: bloodGroupSchema }
    }
}, { timestamps: true });

const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema);

module.exports = BloodRequest;
