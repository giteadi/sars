const { db } = require("../Config/db");
const addProperty = async (req, res) => {
    try {
        const { title, description, imageUrl, price, location, bedrooms, bathrooms, amenities } = req.body;

        if (!title || !description || !imageUrl || !price || !location || !bedrooms || !bathrooms) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ error: "Invalid price" });
        }

        if (amenities && !Array.isArray(amenities)) {
            return res.status(400).json({ error: "Amenities should be an array" });
        }

        const propertyQuery = "INSERT INTO property (title, description, image_url, price, location, bedrooms, bathrooms) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const propertyValues = [title, description, imageUrl, price, location, bedrooms, bathrooms];

        const propertyId = await new Promise((resolve, reject) => {
            db.query(propertyQuery, propertyValues, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            });
        });

        if (amenities) {
            const amenityPromises = amenities.map(async (amenity) => {
                const existingAmenityQuery = "SELECT id FROM amenities WHERE name = ?";
                const existingAmenity = await new Promise((resolve, reject) => {
                    db.query(existingAmenityQuery, [amenity], (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                    });
                });

                let amenityId;
                if (existingAmenity.length > 0) {
                    amenityId = existingAmenity[0].id;
                } else {
                    const insertAmenityQuery = "INSERT INTO amenities (name) VALUES (?)";
                    amenityId = await new Promise((resolve, reject) => {
                        db.query(insertAmenityQuery, [amenity], (err, result) => {
                            if (err) return reject(err);
                            resolve(result.insertId);
                        });
                    });
                }

                const propertyAmenityQuery = "INSERT INTO property_amenities (property_id, amenity_id) VALUES (?, ?)";
                await new Promise((resolve, reject) => {
                    db.query(propertyAmenityQuery, [propertyId, amenityId], (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
            });

            await Promise.all(amenityPromises);
        }

        res.status(201).json({ message: "Property added successfully", propertyId });
    } catch (error) {
        console.error("Error in adding property:", error.message);
        res.status(500).json({ success: false, message: "Error in adding property", error: error.message });
    }
};

// Get Properties
const getProperties = async (req, res) => {
    try {
        const propertyQuery = `
            SELECT p.*, GROUP_CONCAT(a.name) AS amenities
            FROM property p
            LEFT JOIN property_amenities pa ON p.id = pa.property_id
            LEFT JOIN amenities a ON pa.amenity_id = a.id
            GROUP BY p.id
        `;
        
        const properties = await new Promise((resolve, reject) => {
            db.query(propertyQuery, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        res.status(200).json({ properties });
    } catch (error) {
        console.error("Error in fetching properties:", error.message);
        res.status(500).json({ success: false, message: "Error in fetching properties", error: error.message });
    }
};

// Update Property
const updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, imageUrl, price, location, bedrooms, bathrooms, amenities } = req.body;

        const updateQuery = "UPDATE property SET title = ?, description = ?, image_url = ?, price = ?, location = ?, bedrooms = ?, bathrooms = ? WHERE id = ?";
        const updateValues = [title, description, imageUrl, price, location, bedrooms, bathrooms, id];

        await new Promise((resolve, reject) => {
            db.query(updateQuery, updateValues, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        if (amenities) {
            const deleteAmenitiesQuery = "DELETE FROM property_amenities WHERE property_id = ?";
            await new Promise((resolve, reject) => {
                db.query(deleteAmenitiesQuery, [id], (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });

            const amenityPromises = amenities.map(async (amenity) => {
                const existingAmenityQuery = "SELECT id FROM amenities WHERE name = ?";
                const existingAmenity = await new Promise((resolve, reject) => {
                    db.query(existingAmenityQuery, [amenity], (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                    });
                });

                let amenityId;
                if (existingAmenity.length > 0) {
                    amenityId = existingAmenity[0].id;
                } else {
                    const insertAmenityQuery = "INSERT INTO amenities (name) VALUES (?)";
                    amenityId = await new Promise((resolve, reject) => {
                        db.query(insertAmenityQuery, [amenity], (err, result) => {
                            if (err) return reject(err);
                            resolve(result.insertId);
                        });
                    });
                }

                const propertyAmenityQuery = "INSERT INTO property_amenities (property_id, amenity_id) VALUES (?, ?)";
                await new Promise((resolve, reject) => {
                    db.query(propertyAmenityQuery, [id, amenityId], (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
            });

            await Promise.all(amenityPromises);
        }

        res.status(200).json({ message: "Property updated successfully" });
    } catch (error) {
        console.error("Error in updating property:", error.message);
        res.status(500).json({ success: false, message: "Error in updating property", error: error.message });
    }
};

// Delete Property
const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteQuery = "DELETE FROM property WHERE id = ?";
        await new Promise((resolve, reject) => {
            db.query(deleteQuery, [id], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
        console.error("Error in deleting property:", error.message);
        res.status(500).json({ success: false, message: "Error in deleting property", error: error.message });
    }
};

module.exports = { addProperty, getProperties, updateProperty, deleteProperty };

