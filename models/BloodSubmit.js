// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const sampleSchema = new Schema({
//     sample_id: {
//         type: String,
//         required: true
//     },
//     hiv: {
//         type: String,
//         required: true
//     },
//     hbsag: {
//         type: String,
//         required: true
//     },
//     syphilis: {
//         type: String,
//         required: true
//     },
//     bgs: {
//         type: String,
//         required: true
//     },
//     hcv: {
//         type: String,
//         required: true
//     },
//     other: {
//         type: String,
//         required: true
//     }
// }, { _id: false });

// const bloodSubmitSchema = new Schema({
//     center_id: {
//         type: String,
//         required: true
//     },
//     facility_sending_sample: {
//         type: String,
//         required: true
//     },
//     center: {
//         type: String,
//         required: true
//     },
//     hub: {
//         type: String,
//         required: true
//     },
//     sender_name: {
//         type: String,
//         required: true
//     },
//     dispatch_date: {
//         type: Date,
//         required: true
//     },
//     samples: {
//         type: sampleSchema,
//         required: false
//     }
// }, { timestamps: true });

// const BloodSample = mongoose.model('BloodSubmit', bloodSubmitSchema);
// module.exports = BloodSample;




const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
    sample_id: { type: String, required: true },
    hiv: { type: String, required: true },
    hbsag: { type: String, required: true },
    syphilis: { type: String, required: true },
    bgs: { type: String, required: true },
    hcv: { type: String, required: true },
    other: { type: String, required: true }
});

const bloodSampleSchema = new mongoose.Schema({
    center_id: { type: String, required: true },
    facility_sending_sample: { type: String, required: true },
    center: { type: String, required: true },
    hub: { type: String, required: true },
    sender_name: { type: String, required: true },
    dispatch_date: { type: String, required: true },
    samples: { type: [sampleSchema], required: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true }
});

// const BloodSample = mongoose.model('BloodSample', bloodSampleSchema);
const BloodSample = mongoose.model('BloodSubmit', bloodSampleSchema);
module.exports = BloodSample;
