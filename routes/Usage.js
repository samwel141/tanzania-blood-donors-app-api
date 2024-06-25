const express = require('express')
const router = express.Router()
// const { authenticateCenter } = require('../middleware/authenticate')
const BloodUsage = require('../controllers/BloodUsageController');


// router.get('/', authenticateCenter, express.json(), BloodCenterController.allBloodCenters)
router.get('/:donor_id', BloodUsage.getAllUsageByDonorId)
router.get('/', express.json(), BloodUsage. getAllUsage)
router.post('/', express.json(), BloodUsage. postUsage)
router.get('/donor/:donor_id', BloodUsage.getAllUsageByDonorId)
router.get('/center/:center_id', BloodUsage.getAllUsageByDonorId)

module.exports = router


