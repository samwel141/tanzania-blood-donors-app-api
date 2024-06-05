const express = require('express')
const router = express.Router()
// const { authenticateCenter } = require('../middleware/authenticate')
const BloodRequestController = require('../controllers/BloodRequestController')


// router.get('/', authenticateCenter, express.json(), BloodCenterController.allBloodCenters)
router.get('/', express.json(), BloodRequestController.getAllRequests)
router.post('/', express.json(), BloodRequestController.postRequests)
router.get('/getbyid', express.json(), BloodRequestController.getById)
router.get('/getbycenterid', express.json(), BloodRequestController.getByCenterId)



module.exports = router


