// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../Controllers/reservations');

// Create a reservation
router.post('/Createreservations', reservationController.createReservation);

router.get('/getReservation', reservationController.getAllReservations);
// Update the payment status of a reservation
router.put('/paymentStatus', reservationController.updatePaymentStatus);

// Get reservations for a user
router.get('/getReservationByUserID/:user_id', reservationController.getUserReservations);
router.get('/getReservationByPropertyID/:property_id', reservationController.getReservationsByPropertyId);
module.exports = router;
