const express = require('express');
const router = express.Router();
const availabilityController = require('../Controllers/chekAvaility');

// Add availability
router.post('/addAvialibility', availabilityController.addAvailability);

// Check availability for specific dates
router.get('/check', availabilityController.checkAvailability);

// Get all availability records for a specific property
router.get('/chekAvialibilityById/:property_id', availabilityController.getAvailabilityByProperty);

// Update availability record
router.put('/updateAvilabilityByID/:id', availabilityController.updateAvailability);
router.post('/markBookByID/:id',availabilityController.markAsBooked);
// Delete availability record
router.delete('/deleteAvialibilty/:id', availabilityController.deleteAvailability);

module.exports = router;
