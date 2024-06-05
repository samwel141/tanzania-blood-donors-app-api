const express = require('express')
const router = express.Router()
// const { authenticateCenter } = require('../middleware/authenticate')
const BloodSubmitController = require('../controllers/BloodSubmitController')


// router.get('/', authenticateCenter, express.json(), BloodCenterController.allBloodCenters)
router.get('/', express.json(), BloodSubmitController.getAllBloodSamples)
router.post('/', express.json(), BloodSubmitController.postBloodSample)
router.get('/getbycenterid', express.json(), BloodSubmitController.getBloodSampleById)
router.get('/getbyid', express.json(), BloodSubmitController.getBloodSamplesByCenterId)


module.exports = router


