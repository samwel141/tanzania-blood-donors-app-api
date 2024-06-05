const express = require('express')
const router = express.Router()
// const { authenticateCenter } = require('../middleware/authenticate')
const BloodCenterController = require('../controllers/BloodCenterController')


router.get('/', express.json(), BloodCenterController.allBloodCenters)
router.get('/getbyid', express.json(), BloodCenterController.getBloodCenterById)
router.get('/update', express.json(), BloodCenterController.updateBloodCenter)
router.get('/remove', express.json(), BloodCenterController.deleteBloodCenter)
router.post('/register', express.json(), BloodCenterController.register)
router.post('/login', express.json(), BloodCenterController.login)
router.post('/refresh', express.json(), BloodCenterController.refreshToken)

module.exports = router


