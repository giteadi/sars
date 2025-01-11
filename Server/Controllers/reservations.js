const { db } = require('../Config/db');
const { format } = require('date-fns');

// Create a reservation
exports.createReservation = (req, res) => {
    const { product_id, user_id, total_price, payment_method, payment_id, transaction_id } = req.body;

    // Ensure that all required fields are present
    if (!product_id || !user_id || !total_price || !payment_method || !payment_id || !transaction_id) {
        return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    // Validate total_price (should be a positive number)
    if (isNaN(total_price) || total_price <= 0) {
        return res.status(400).json({ error: 'Total price must be a positive number.' });
    }

    // Validate payment_method (add additional checks if necessary)
    const validPaymentMethods = ['credit_card', 'paypal', 'bank_transfer']; // Example
    if (!validPaymentMethods.includes(payment_method)) {
        return res.status(400).json({ error: 'Invalid payment method.' });
    }

    // Proceed with reservation creation
    const reservationQuery = `
        INSERT INTO reservation (product_id, user_id, total_price, payment_method, payment_id, transaction_id) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(reservationQuery, [product_id, user_id, total_price, payment_method, payment_id, transaction_id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        return res.status(201).json({ message: 'Reservation created successfully', reservationId: results.insertId });
    });
};

// Update payment status after successful payment
exports.updatePaymentStatus = (req, res) => {
    const { reservation_id, payment_status } = req.body;

    if (!reservation_id || !payment_status) {
        return res.status(400).json({ error: 'Reservation ID and payment status are required.' });
    }

    // Ensure payment_status is valid
    const validPaymentStatuses = ['success', 'failed'];
    if (!validPaymentStatuses.includes(payment_status)) {
        return res.status(400).json({ error: 'Invalid payment status.' });
    }

    const query = `
        UPDATE reservation 
        SET payment_status = ?, status = ? 
        WHERE reservation_id = ?
    `;
    db.query(query, [payment_status, payment_status === 'success' ? 'confirmed' : 'failed', reservation_id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Reservation not found.' });
        }

        res.status(200).json({ message: 'Payment status updated successfully.' });
    });
};

// Get all reservations
exports.getAllReservations = (req, res) => {
    const query = `
        SELECT * FROM reservation
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        results.forEach(item => {
            item.created_at = format(new Date(item.created_at), 'MMM d, yyyy');
        });

        res.status(200).json(results);
    });
};

// Fetch reservations for a user
exports.getUserReservations = (req, res) => {
    const { user_id } = req.params;

    const query = `
        SELECT * FROM reservation 
        WHERE user_id = ?
    `;
    db.query(query, [user_id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        results.forEach(item => {
            item.created_at = format(new Date(item.created_at), 'MMM d, yyyy');
        });

        res.status(200).json(results);
    });
};

// Get reservations by product ID (product name, description, dimensions, and services included)
exports.getReservationsByProductId = (req, res) => {
    const { product_id } = req.params;

    // Ensure product_id is provided
    if (!product_id) {
        return res.status(400).json({ error: 'Product ID is required.' });
    }

    const getReservationsQuery = `
        SELECT 
            reservation.reservation_id,
            reservation.product_id,
            reservation.user_id,
            reservation.total_price,
            reservation.payment_method,
            reservation.payment_id,
            reservation.transaction_id,
            reservation.created_at,
            userdata.name AS user_name, 
            products.title AS product_name,
            products.description,
            products.dimensions,
            products.services
        FROM reservation
        LEFT JOIN userdata ON reservation.user_id = userdata.user_id
        LEFT JOIN products ON reservation.product_id = products.id
        WHERE reservation.product_id = ?
        ORDER BY reservation.created_at DESC
    `;

    db.query(getReservationsQuery, [product_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }

        return res.status(200).json({ message: 'Reservations retrieved successfully', data: results });
    });
};
