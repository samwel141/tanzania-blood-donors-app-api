const express = require('express')
const router = express.Router()
// const { authenticateDonor } = require('../middleware/authenticate')
const DonorAuthController = require('../controllers/DonorController')

router.get('/', express.json(), DonorAuthController.allDonors)
router.get('/getbyid', express.json(), DonorAuthController.getDonorById)
router.get('/update', express.json(), DonorAuthController.updateDonor)
router.get('/remove', express.json(), DonorAuthController.deleteDonor)
router.post('/register', express.json(), DonorAuthController.register)
router.post('/login', express.json(), DonorAuthController.login)
router.post('/refresh', express.json(), DonorAuthController.refreshToken)
router.post('/reset', express.json(), DonorAuthController.resetPassword)

module.exports = router


