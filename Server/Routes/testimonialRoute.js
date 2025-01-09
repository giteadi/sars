const express = require('express');
const router = express.Router();
const {
    addTestimonial, 
    getAllTestimonials, 
    getTestimonialsByPropertyId, 
    updateTestimonial, 
    deleteTestimonial
} = require('../Controllers/Testimonial');

// Add a new testimonial
router.post('/addReview', addTestimonial);

// Get all testimonials
router.get('/getAllReview', getAllTestimonials);

// Get testimonials for a specific property
router.get('/getReviewByPropertyId/:property_id', getTestimonialsByPropertyId);

// Update a testimonial
router.put('/updateReviewByID/:id', updateTestimonial);

// Delete a testimonial
router.delete('/deleteReview/:id', deleteTestimonial);

module.exports = router;
