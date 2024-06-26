const Donation = require('../models/Donation');
const Donor = require('../models/Donor');
const BloodCenter = require('../models/BloodCenter');
const mongoose = require('mongoose');

// Post a new donation
const postDonation = async (req, res) => {
    try {
        const donationData = req.body;
        const donation = new Donation(donationData);
        const savedDonation = await donation.save();
        
        const formattedDonation = {
            id: savedDonation._id,
            donor_id: savedDonation.donor_id,
            center_id: savedDonation.center_id,
            date: savedDonation.date.toLocaleDateString('en-US'), // Format date to M/D/Y
            sample_id: savedDonation.sample_id
        };

        res.status(201).json(formattedDonation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all donations
const getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find();
        
        const formattedDonations = donations.map(donation => ({
            id: donation._id,
            donor_id: donation.donor_id,
            center_id: donation.center_id,
            date: donation.date.toLocaleDateString('en-US'), // Format date to M/D/Y
            sample_id: donation.sample_id
        }));

        res.status(200).json(formattedDonations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get donation by ID
const getDonationById = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        const formattedDonation = {
            id: donation._id,
            donor_id: donation.donor_id,
            center_id: donation.center_id,
            date: donation.date.toLocaleDateString('en-US'), // Format date to M/D/Y
            sample_id: donation.sample_id
        };

        res.status(200).json(formattedDonation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};
const getDonationsByDonorId = async (req, res) => {
    try {
        const { donor_id } = req.query;
        
        const donations = await Donation.find({ donor_id });

        const donor = await Donor.findOne({ _id: donor_id });

        if (!donor) {
            return res.status(404).json({ error: 'Donor not found' });
        }

        const formattedDonations = await Promise.all(donations.map(async (donation) => {
            let bloodCenter = null;
            if (isValidObjectId(donation.center_id)) {
                bloodCenter = await BloodCenter.findOne({ _id: donation.center_id });
            }

            return {
                id: donation._id,
                donor_id: donation.donor_id,
                center_id: donation.center_id,
                date: donation.date,
                sample_id: donation.sample_id,
                firstname: donor.firstname,
                surname: donor.sirname,
                center_name: bloodCenter ? bloodCenter.name : 'Unknown'
            };
        }));

        res.status(200).json(formattedDonations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get donations by center ID
const getDonationsByCenterId = async (req, res) => {
    try {
        const donations = await Donation.find({ center_id: req.params.center_id });
        
        const formattedDonations = donations.map(donation => ({
            id: donation._id,
            donor_id: donation.donor_id,
            center_id: donation.center_id,
            date: donation.date.toLocaleDateString('en-US'), // Format date to M/D/Y
            sample_id: donation.sample_id
        }));

        res.status(200).json(formattedDonations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    postDonation,
    getAllDonations,
    getDonationById,
    getDonationsByDonorId,
    getDonationsByCenterId
};
