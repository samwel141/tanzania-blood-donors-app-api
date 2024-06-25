const express = require('express');
const router = express.Router();
const donationController = require('../controllers/BloodDonationController');


router.get('/:donor_id', donationController.getDonationsByDonorId);
router.post('/', donationController.postDonation);
router.get('/', donationController.getAllDonations);
router.get('/donor/:donor_id', donationController.getDonationsByDonorId);
router.get('/:id', donationController.getDonationById);
router.get('/center/:center_id', donationController.getDonationsByCenterId);

module.exports = router;
