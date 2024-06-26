// controllers/bloodSampleController.js

const BloodUsage = require('../models/Usage');
const Donor = require('../models/Donor');
const BloodCenter = require('../models/BloodCenter');
const mongoose = require('mongoose');

// Get all blood samples
const getAllUsage = async (req, res) => {
    try {
        const bloodSamples = await BloodUsage.find();
        const count = bloodSamples.length;

        const formattedSamples = bloodSamples.map(sample => {
            return {
                _id: sample._id,
                donor_id: sample.donor_id,
                center_id: sample.center_id,
                date: sample.date,
                createdAt: sample.createdAt,
                updatedAt: sample.updatedAt
            };
        });

        res.status(200).json({ total: count, data: formattedSamples });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

const getAllUsageByDonorId = async (req, res) => {
    try {
        const { donor_id } = req.query;
        console.log(req.query);
        console.log('From the route', donor_id);

        // Fetch blood samples by donor_id
        const bloodSamples = await BloodUsage.find({ donor_id });
        console.log(bloodSamples);

        // Fetch donor information by donor_id
        const donor = await Donor.findOne({ _id: donor_id });

        // Check if donor exists
        if (!donor) {
            return res.status(404).json({ error: 'Donor not found' });
        }

        // Fetch blood center information for each blood sample
        const formattedSamples = await Promise.all(bloodSamples.map(async (sample) => {
            let bloodCenter = null;
            if (isValidObjectId(sample.center_id)) {
                bloodCenter = await BloodCenter.findOne({ _id: sample.center_id });
            }

            return {
                _id: sample._id,
                donor_id: sample.donor_id,
                center_id: sample.center_id,
                date: sample.date,
                createdAt: sample.createdAt,
                updatedAt: sample.updatedAt,
                firstname: donor.firstname,
                surname: donor.sirname,
                center_name: bloodCenter ? bloodCenter.name : 'Unknown'
            };
        }));

        res.status(200).json({ data: formattedSamples });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Get blood sample by ID
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const sample = await BloodSample.findById(id);

        if (!sample) {
            return res.status(404).json({ error: 'Blood sample not found' });
        }

        const formattedSample = {
            _id: sample._id,
            donor_id: sample.donor_id,
            center_id: sample.center_id,
            date: sample.date,
            createdAt: sample.createdAt,
            updatedAt: sample.updatedAt
        };

        res.status(200).json(formattedSample);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Post a new blood sample usage
const postUsage = async (req, res) => {
    try {
        const bloodUsageData = req.body;
        const UsageData = new BloodUsage(bloodUsageData);
        const savedSample = await UsageData.save();


        const formattedSample = {
            _id: savedSample._id,
            donor_id: savedSample.donor_id,
            center_id: savedSample.center_id,
            date: savedSample.date,
            createdAt: savedSample.createdAt,
            updatedAt: savedSample.updatedAt
        };

        res.status(201).json(formattedSample);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUsage,
    getAllUsageByDonorId,
    getById,
    postUsage
};
