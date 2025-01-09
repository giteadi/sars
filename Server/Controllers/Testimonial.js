const {db} = require('../Config/db'); 

// Insert a Testimonial
const addTestimonial = (req, res) => {
    const { property_id, user_id, user_name, user_email, message, rating } = req.body;

    if (!property_id || !user_id || !user_name || !message || !rating) {
        return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    // Check if the user has successfully booked the property and the checkout date has passed
    const validationQuery = `
        SELECT COUNT(*) AS valid, r.created_at AS booking_date, r.end_date, r.payment_status
        FROM reservations r
        WHERE r.user_id = ? 
        AND r.property_id = ? 
        AND r.payment_status = 'success'
    `;

    db.query(validationQuery, [user_id, property_id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        // Log the results for debugging
        // console.log('Reservation Validation Results:', results);

        if (results.length === 0 || results[0].valid === 0) {
            return res.status(400).json({
                error: 'No valid reservation found or payment not completed.'
            });
        }

        // Get the reservation's end_date and payment status
        const reservation = results[0];
        const endDate = reservation.end_date;
        const paymentStatus = reservation.payment_status;

        // Check if the stay is completed (end_date has passed or is today)
        const isCompleted = new Date(endDate) <= new Date();
        if (!isCompleted) {
            return res.status(400).json({
                error: 'You can only add a review after successfully booking and completing your stay.'
            });
        }

        // Insert the testimonial after validation
        const query = `
            INSERT INTO testimonials (property_id, user_id, user_name, user_email, message, rating) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [property_id, user_id, user_name, user_email, message, rating], (err, results) => {
            if (err) return res.status(500).json({ error: 'Database error', details: err });

            // Send response with the testimonial ID and booking date
            res.status(201).json({
                message: 'Testimonial added successfully',
                testimonialId: results.insertId,
                bookingDate: reservation.booking_date
            });
        });
    });
};


// Fetch All Testimonials
const getAllTestimonials = (req, res) => {
    const query = `SELECT * FROM testimonials ORDER BY created_at DESC`;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });
        res.status(200).json(results);
    });
};

// Fetch Testimonials for a Specific Property
const getTestimonialsByPropertyId = (req, res) => {
    const { property_id } = req.params;

    const query = `SELECT * FROM testimonials WHERE property_id = ? ORDER BY created_at DESC`;
    db.query(query, [property_id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });
        res.status(200).json(results);
    });
};

// Update a Testimonial
const updateTestimonial = (req, res) => {
    const { id } = req.params;
    const { user_name, user_email, message, rating } = req.body;

    const query = `
        UPDATE testimonials 
        SET user_name = ?, user_email = ?, message = ?, rating = ?
        WHERE id = ?
    `;
    db.query(query, [user_name, user_email, message, rating, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }
        res.status(200).json({ message: 'Testimonial updated successfully' });
    });
};

// Delete a Testimonial
const deleteTestimonial = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM testimonials WHERE id = ?`;
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }
        res.status(200).json({ message: 'Testimonial deleted successfully' });
    });
};

module.exports = {
    addTestimonial,
    getAllTestimonials,
    getTestimonialsByPropertyId,
    updateTestimonial,
    deleteTestimonial
};
