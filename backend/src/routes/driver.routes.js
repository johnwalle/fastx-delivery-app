const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const driverController = require('../controllers/driver.controller');

router.post('/create', auth.requireSignIn, auth.adminMiddleware, driverController.createDriver);
router.get('/all', auth.requireSignIn, auth.adminMiddleware, driverController.getAllDrivers);
router.get('/:driverId', auth.requireSignIn, auth.adminMiddleware, driverController.getDriverById);
router.put('/update/:driverId', auth.requireSignIn, auth.adminMiddleware, driverController.updateDriverById);
router.delete('/delete/:driverId', auth.requireSignIn, auth.adminMiddleware, driverController.deleteDriver);

module.exports = router;


