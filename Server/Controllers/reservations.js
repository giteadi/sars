const { db } = require('../Config/db');
const { format } = require('date-fns');

// Create a reservation
exports.createReservation = (req, res) => {
    const { property_id, user_id, start_date, end_date, total_price, payment_method, payment_id, transaction_id } = req.body;

    // Ensure that all required fields are present
    if (!property_id || !user_id || !start_date || !end_date || !total_price || !payment_method || !payment_id || !transaction_id) {
        return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    // Check if the selected dates are available (not already booked)
    const checkAvailabilityQuery = `
        SELECT * FROM property_availability 
        WHERE property_id = ? 
        AND (
            (start_date BETWEEN ? AND ?) OR
            (end_date BETWEEN ? AND ?) OR
            (? BETWEEN start_date AND end_date) OR
            (? BETWEEN start_date AND end_date)
        ) AND is_booked = 1
    `;
    
    db.query(checkAvailabilityQuery, [property_id, start_date, end_date, start_date, end_date, start_date, end_date], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        if (results.length > 0) {
            // If there are bookings overlapping with the selected dates
            return res.status(400).json({ error: 'The selected dates are unavailable.' });
        }

        // Proceed with reservation creation if dates are available
        const reservationQuery = `
            INSERT INTO reservations (property_id, user_id, start_date, end_date, total_price, payment_method, payment_id, transaction_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(reservationQuery, [property_id, user_id, start_date, end_date, total_price, payment_method, payment_id, transaction_id], (err, results) => {
            if (err) return res.status(500).json({ error: 'Database error', details: err });

            // Mark the property as booked
            const markBookedQuery = `
                UPDATE property_availability 
                SET is_booked = 1 
                WHERE property_id = ? AND start_date = ? AND end_date = ?
            `;

            db.query(markBookedQuery, [property_id, start_date, end_date], (err, results) => {
                if (err) return res.status(500).json({ error: 'Database error', details: err });

                return res.status(201).json({ message: 'Reservation created successfully', reservationId: results.insertId });
            });
        });
    });
};

// Update payment status after successful payment
exports.updatePaymentStatus = (req, res) => {
    const { reservation_id, payment_status } = req.body;

    if (!reservation_id || !payment_status) {
        return res.status(400).json({ error: 'Reservation ID and payment status are required.' });
    }

    const query = `
        UPDATE reservations 
        SET payment_status = ?, status = ? 
        WHERE id = ?
    `;
    db.query(query, [payment_status, payment_status === 'success' ? 'confirmed' : 'failed', reservation_id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Reservation not found.' });
        }

        res.status(200).json({ message: 'Payment status updated successfully.' });
    });
};

// get all reservation
exports.getAllReservations = (req, res) => {
    const query = `
        SELECT * FROM reservations
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        results.forEach(item => {
            item.start_date = format(new Date(item.start_date), 'MMM d, yyyy');
            item.end_date = format(new Date(item.end_date), 'MMM d, yyyy');
            item.created_at = format(new Date(item.created_at), 'MMM d, yyyy');
        });

        res.status(200).json(results);
    });
};

// Fetch reservations for a user
exports.getUserReservations = (req, res) => {
    const { user_id } = req.params;

    const query = `
        SELECT * FROM reservations 
        WHERE user_id = ?
    `;
    db.query(query, [user_id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        results.forEach(item => {
            item.start_date = format(new Date(item.start_date), 'MMM d, yyyy');
            item.end_date = format(new Date(item.end_date), 'MMM d, yyyy');
            item.created_at = format(new Date(item.created_at), 'MMM d, yyyy');
        });

        res.status(200).json(results);
    });
};
exports.getReservationsByPropertyId = (req, res) => {
    const { property_id } = req.params;

    // Ensure property_id is provided
    if (!property_id) {
        return res.status(400).json({ error: 'Property ID is required.' });
    }

    const getReservationsQuery = `
        SELECT 
            reservations.id AS reservation_id,
            reservations.property_id,
            reservations.user_id,
            reservations.start_date,
            reservations.end_date,
            reservations.total_price,
            reservations.payment_method,
            reservations.payment_id,
            reservations.transaction_id,
            reservations.created_at,
            userdata.name AS user_name, -- Updated from users to userdata
            feature_property.title AS property_name -- Updated to use feature_property table
        FROM reservations
        LEFT JOIN userdata ON reservations.user_id = userdata.user_id -- Corrected foreign key field
        LEFT JOIN feature_property ON reservations.property_id = feature_property.id -- Corrected foreign key field
        WHERE reservations.property_id = ?
        ORDER BY reservations.created_at DESC
    `;

    db.query(getReservationsQuery, [property_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }

        return res.status(200).json({ message: 'Reservations retrieved successfully', data: results });
    });
};
