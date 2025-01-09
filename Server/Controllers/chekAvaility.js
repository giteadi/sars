const {db} = require('../Config/db'); 
const { format } = require('date-fns');
// Add Availability
exports.addAvailability = (req, res) => {
    const { property_id, start_date, end_date, is_booked = 0, number_of_guests, user_id } = req.body;

    // Validate required fields
    if (!property_id || !start_date || !end_date || !number_of_guests || !user_id) {
        return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    // Check if user_id exists in userdata table
    const checkUserQuery = `SELECT user_id FROM userdata WHERE user_id = ?`;
    db.query(checkUserQuery, [user_id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        if (results.length === 0) {
            return res.status(400).json({ error: 'Invalid user_id provided.' });
        }

        // Check for date overlaps with existing bookings
        const checkOverlapQuery = `
            SELECT * FROM property_availability 
            WHERE property_id = ? AND (
                (start_date <= ? AND end_date >= ?) OR
                (start_date <= ? AND end_date >= ?)
            )
        `;
        db.query(checkOverlapQuery, [property_id, start_date, start_date, end_date, end_date], (err, overlapResults) => {
            if (err) return res.status(500).json({ error: 'Database error', details: err });

            if (overlapResults.length > 0) {
                return res.status(400).json({ error: 'The property is already booked for the selected dates.' });
            }

            // Proceed with inserting the new availability record
            const query = `
                INSERT INTO property_availability (property_id, start_date, end_date, is_booked, number_of_guests, user_id) 
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            db.query(query, [property_id, start_date, end_date, is_booked, number_of_guests, user_id], (err, results) => {
                if (err) return res.status(500).json({ error: 'Database error', details: err });
                res.status(201).json({ message: 'Availability added successfully', availabilityId: results.insertId });
            });
        });
    });
};

// Check Availability for a Property
exports.checkAvailability = (req, res) => {
    const { property_id, start_date, end_date , number_of_guests } = req.query;

    if (!property_id || !start_date || !end_date || number_of_guests ) {
        return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    const query = `
        SELECT * FROM property_availability 
        WHERE property_id = ? AND 
        is_booked = 0 AND 
        (start_date <= ? AND end_date >= ?)
    `;

    db.query(query, [property_id, end_date, start_date], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        if (results.length > 0) {
            res.status(200).json({ available: false, message: 'Property is not available for the given dates.' });
        } else {
            res.status(200).json({ available: true, message: 'Property is available for the given dates.' });
        }
    });
};


// Fetch All Availability Records for a Property
exports.getAvailabilityByProperty = (req, res) => {
    const { property_id } = req.params;

    const query = `
        SELECT 
            pa.id, 
            pa.property_id, 
            pa.start_date AS availability_start_date, 
            pa.end_date AS availability_end_date, 
            pa.is_booked, 
            pa.created_at AS availability_created_at, 
            r.id AS reservation_id, 
            r.start_date AS reservation_start_date, 
            r.end_date AS reservation_end_date, 
            r.status AS reservation_status
        FROM property_availability pa
        LEFT JOIN reservations r ON pa.property_id = r.property_id 
            AND r.start_date <= pa.end_date
            AND r.end_date >= pa.start_date
        WHERE pa.property_id = ? 
        ORDER BY pa.start_date ASC
    `;

    db.query(query, [property_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }

        // Filter out duplicate entries based on availability (keep only one record)
        const uniqueResults = [];
        const seen = new Set();

        results.forEach(item => {
            // Check if this availability record has been processed already
            if (!seen.has(item.id)) {
                uniqueResults.push(item);
                seen.add(item.id);
            }
        });

        // Format the dates using date-fns
        uniqueResults.forEach(item => {
            item.availability_start_date = format(new Date(item.availability_start_date), 'MMM d, yyyy');
            item.availability_end_date = format(new Date(item.availability_end_date), 'MMM d, yyyy');
            item.availability_created_at = format(new Date(item.availability_created_at), 'MMM d, yyyy'); // Optional

            if (item.reservation_start_date) {
                item.reservation_start_date = format(new Date(item.reservation_start_date), 'MMM d, yyyy');
            }
            if (item.reservation_end_date) {
                item.reservation_end_date = format(new Date(item.reservation_end_date), 'MMM d, yyyy');
            }
        });

        res.status(200).json(uniqueResults);
    });
};



// mark booked 
exports.markAsBooked = (req, res) => {
    const { id } = req.params;
    const { is_booked } = req.body;

    if (typeof is_booked === 'undefined') {
        return res.status(400).json({ error: "Missing 'is_booked' field in the request body." });
    }

    const query = `UPDATE property_availability SET is_booked = ? WHERE id = ?`;
    db.query(query, [is_booked, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Availability record not found.' });
        }

        res.status(200).json({ message: 'Booking status updated successfully.' });
    });
};

// Update Availability
exports.updateAvailability = (req, res) => {
    const { id } = req.params;
    const { start_date, end_date, is_booked,number_of_guests } = req.body;

    const query = `
        UPDATE property_availability 
        SET start_date = ?, end_date = ?, is_booked = ? ,number_of_guests = ?
        WHERE id = ?
    `;
    db.query(query, [start_date, end_date, is_booked,number_of_guests, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Availability record not found' });
        }
        res.status(200).json({ message: 'Availability updated successfully' });
    });
};


// Delete Availability
exports.deleteAvailability = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM property_availability WHERE id = ?`;
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Availability record not found' });
        }
        res.status(200).json({ message: 'Availability deleted successfully' });
    });
};
