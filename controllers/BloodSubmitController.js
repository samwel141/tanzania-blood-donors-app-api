const BloodSample = require('../models/BloodSubmit'); 

// 1. Post blood sample data, allowing insertion of a single document with multiple samples
// const postBloodSample = async (req, res, next) => {
//     try {
//         const bloodSampleData = req.body;
//         const bloodSample = new BloodSample(bloodSampleData);
//         const savedSample = await bloodSample.save();
//         res.status(201).json(savedSample);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


const postBloodSample = async (req, res, next) => {
    try {
        const bloodSampleData = req.body;
        const bloodSample = new BloodSample(bloodSampleData);
        const savedSample = await bloodSample.save();

        // Formatting the response
        const formattedSample = {
            _id: savedSample._id,
            center_id: savedSample.center_id,
            facility_sending_sample: savedSample.facility_sending_sample,
            center: savedSample.center,
            hub: savedSample.hub,
            sender_name: savedSample.sender_name,
            dispatch_date: savedSample.dispatch_date,
            samples: savedSample.samples.map(sample => ({
                _id: sample._id,
                sample_id: sample.sample_id,
                hiv: sample.hiv,
                hbsag: sample.hbsag,
                syphilis: sample.syphilis,
                bgs: sample.bgs,
                hcv: sample.hcv,
                other: sample.other
            })),
            created_at: savedSample.created_at,
            updated_at: savedSample.updated_at,
            __v: savedSample.__v
        };

        res.status(201).json(formattedSample);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 2. Get all blood samples
// const getAllBloodSamples = async (req, res, next) => {
//     try {
//         const bloodSamples = await BloodSample.find();
//         const count = bloodSamples.length;


//         // res.status(200).json(bloodSamples);
//         res.status(200).json({ total: count, data: bloodSamples });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


const getAllBloodSamples = async (req, res, next) => {
    try {
        const bloodSamples = await BloodSample.find();
        const count = bloodSamples.length;

        const formattedSamples = bloodSamples.map(sample => {
            return {
                _id: sample._id,
                center_id: sample.center_id,
                facility_sending_sample: sample.facility_sending_sample,
                center: sample.center,
                hub: sample.hub,
                sender_name: sample.sender_name,
                dispatch_date: sample.dispatch_date,
                samples: sample.samples.map(s => ({
                    _id: s._id,
                    sample_id: s.sample_id,
                    hiv: s.hiv,
                    hbsag: s.hbsag,
                    syphilis: s.syphilis,
                    bgs: s.bgs,
                    hcv: s.hcv,
                    other: s.other
                })),
                created_at: sample.created_at,
                updated_at: sample.updated_at,
                __v: sample.__v
            };
        });

        res.status(200).json({ total: count, data: formattedSamples });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// 4. Get blood sample by _id
const getBloodSampleById = async (req, res, next) => {
    try {
        const sampleId = req.params.id;
        const bloodSample = await BloodSample.findById(sampleId);
        if (!bloodSample) {
            return res.status(404).json({ error: 'Blood sample not found' });
        }
        res.status(200).json(bloodSample);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Get blood samples by center_id
const getBloodSamplesByCenterId = async (req, res, next) => {
    try {
        const centerId = req.params.center_id;
        const bloodSamples = await BloodSample.find({ center_id: centerId });
        if (bloodSamples.length === 0) {
            return res.status(404).json({ error: 'No blood samples found for the given center_id' });
        }
        res.status(200).json(bloodSamples);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    postBloodSample,
    getAllBloodSamples,
    getBloodSampleById,
    getBloodSamplesByCenterId
};
