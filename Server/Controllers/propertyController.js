const {db} = require("../Config/db");

const createProperty = async (req, res) => {
    try {
        console.log("Controller: Received request body:", req.body);

        const { title, description, price, location, bedrooms, bathrooms, is_premium, amenities } = req.body;
        const imageUrls = req.body.imageUrls; // Array of image URLs from middleware

        // Validate required fields
        if (!title || !description || !price || !location || !bedrooms || !imageUrls || imageUrls.length === 0) {
            return res.status(400).json({ success: false, message: "All fields including images are required" });
        }

        // Start transaction
        await new Promise((resolve, reject) => {
            db.beginTransaction((err) => (err ? reject(err) : resolve()));
        });

        // Insert property into `feature_property`
        const insertPropertyQuery = `
            INSERT INTO feature_property (title, description, price, location, bedrooms, bathrooms, is_premium)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const propertyResult = await new Promise((resolve, reject) => {
            db.query(insertPropertyQuery, [title, description, price, location, bedrooms, bathrooms, is_premium], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        const propertyId = propertyResult.insertId;

        // Insert images in bulk into `property_images`
        const insertImageQuery = `
            INSERT INTO property_images (property_id, image_url)
            VALUES ?
        `;
        const imageValues = imageUrls.map((url) => [propertyId, url]);
        await new Promise((resolve, reject) => {
            db.query(insertImageQuery, [imageValues], (err) => (err ? reject(err) : resolve()));
        });

        // Insert amenities into `property_amenities`
        if (amenities) {
            const amenitiesList = amenities.split(",").map((a) => a.trim());
            const insertAmenitiesQuery = `
                INSERT INTO property_amenities (property_id, amenity_id)
                VALUES ?
            `;

            const amenityIds = await Promise.all(
                amenitiesList.map(async (amenity) => {
                    // Check if amenity exists
                    const checkAmenityQuery = `SELECT id FROM amenities WHERE name = ?`;
                    const amenityResult = await new Promise((resolve, reject) => {
                        db.query(checkAmenityQuery, [amenity], (err, result) => (err ? reject(err) : resolve(result)));
                    });

                    // Insert new amenity if not found
                    if (amenityResult.length === 0) {
                        const insertAmenityQuery = `INSERT INTO amenities (name) VALUES (?)`;
                        const newAmenityResult = await new Promise((resolve, reject) => {
                            db.query(insertAmenityQuery, [amenity], (err, result) => (err ? reject(err) : resolve(result)));
                        });
                        return newAmenityResult.insertId;
                    }

                    return amenityResult[0].id;
                })
            );

            // Link amenities to property in bulk
            const propertyAmenitiesValues = amenityIds.map((id) => [propertyId, id]);
            await new Promise((resolve, reject) => {
                db.query(insertAmenitiesQuery, [propertyAmenitiesValues], (err) => (err ? reject(err) : resolve()));
            });
        }

        // Commit transaction
        await new Promise((resolve, reject) => {
            db.commit((err) => (err ? reject(err) : resolve()));
        });

        res.status(201).json({
            success: true,
            message: "Property created successfully",
            propertyId,
        });
    } catch (error) {
        console.error("Controller: Internal server error:", error.message);
        await new Promise((resolve) => db.rollback(() => resolve())); // Rollback transaction on error
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};


const getAllProperties = async (req, res) => {
    try {
        // Step 1: Fetch properties
        const propertyQuery = `SELECT id, title, description, price, location, bedrooms, bathrooms, is_premium, created_at FROM feature_property`;
        const properties = await new Promise((resolve, reject) => {
            db.query(propertyQuery, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        // Step 2: Fetch images
        const imageQuery = `SELECT property_id, id AS image_id, image_url FROM property_images`;
        const images = await new Promise((resolve, reject) => {
            db.query(imageQuery, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        // Step 3: Fetch amenities
        const amenityQuery = `SELECT property_id, a.name AS amenity FROM property_amenities pa LEFT JOIN amenities a ON pa.amenity_id = a.id`;
        const amenities = await new Promise((resolve, reject) => {
            db.query(amenityQuery, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        // Step 4: Group images and amenities by property_id using maps (for faster access)
        const imageMap = images.reduce((acc, image) => {
            if (!acc[image.property_id]) {
                acc[image.property_id] = [];
            }
            // Avoid duplicates by checking if the image ID already exists for that property
            if (!acc[image.property_id].some(img => img.id === image.image_id)) {
                acc[image.property_id].push({ id: image.image_id, url: image.image_url });
            }
            return acc;
        }, {});

        const amenityMap = amenities.reduce((acc, amenity) => {
            if (!acc[amenity.property_id]) {
                acc[amenity.property_id] = [];
            }
            acc[amenity.property_id].push(amenity.amenity);
            return acc;
        }, {});

        // Step 5: Format the final response
        const formattedProperties = properties.map(property => {
            const { id, title, description, price, location, bedrooms, bathrooms, is_premium, created_at } = property;

            // Get the related images
            const propertyImages = imageMap[id] || [];
            const propertyAmenities = amenityMap[id] || [];

            return {
                id,
                title,
                description,
                price,
                location,
                bedrooms,
                bathrooms,
                is_premium,
                created_at,
                images: propertyImages,
                amenities: propertyAmenities,
            };
        });

        res.status(200).json(formattedProperties);
    } catch (error) {
        console.error("Error fetching properties:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

const getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT 
                p.*, 
                i.id AS image_id,
                i.image_url,
                a.name AS amenity
            FROM 
                feature_property p
            LEFT JOIN 
                property_images i ON p.id = i.property_id
            LEFT JOIN 
                property_amenities pa ON p.id = pa.property_id
            LEFT JOIN 
                amenities a ON pa.amenity_id = a.id
            WHERE 
                p.id = ?
        `;

        const property = await new Promise((resolve, reject) => {
            db.query(query, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        if (!property.length) {
            return res.status(404).json({ error: "Property not found" });
        }

        // Group image and amenity data by property and remove duplicates
        const formattedProperty = property.reduce((acc, prop) => {
            const { id, title, description, price, location, bedrooms, bathrooms, is_premium, created_at, image_id, image_url, amenity } = prop;

            if (!acc) {
                acc = {
                    id,
                    title,
                    description,
                    price,
                    location,
                    bedrooms,
                    bathrooms,
                    is_premium,
                    created_at,
                    images: [],
                    amenities: [],
                };
            }

            // Avoid duplicates by checking if image_id is already in the images array
            if (image_id && image_url) {
                // Check if image already exists by image_id
                const imageExists = acc.images.some(image => image.id === image_id);
                if (!imageExists) {
                    acc.images.push({ id: image_id, url: image_url });
                }
            }

            // Avoid duplicates by checking if amenity already exists in the amenities array
            if (amenity) {
                // Check if amenity already exists
                const amenityExists = acc.amenities.includes(amenity);
                if (!amenityExists) {
                    acc.amenities.push(amenity);
                }
            }

            return acc;
        }, null);

        // If images array is empty or has more than expected, log it
        // console.log("Formatted Property Images:", formattedProperty.images);

        res.status(200).json(formattedProperty);
    } catch (error) {
        console.error("Error fetching property by ID:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

const getFilteredProperties = async (req, res) => {
    try {
        const {
            destination,
            price_min,
            price_max,
            bedrooms,
            bathrooms,
            amenities,
            is_premium,
            checkin,
            checkout,
        } = req.query;

        // Validate date inputs
        if (checkin && checkout && new Date(checkin) > new Date(checkout)) {
            return res.status(400).json({ error: "Check-out date must be after check-in date." });
        }

        // Base query
        let query = `
            SELECT 
                p.*, 
                i.id AS image_id,
                i.image_url,
                a.name AS amenity
            FROM 
                feature_property p
            LEFT JOIN 
                property_images i ON p.id = i.property_id
            LEFT JOIN 
                property_amenities pa ON p.id = pa.property_id
            LEFT JOIN 
                amenities a ON pa.amenity_id = a.id
            WHERE 1=1
        `;

        const params = [];

        // Partial destination filter
        if (destination) {
            query += ` AND p.location LIKE ?`; // Partial match for city name
            params.push(`%${destination}%`);
        }

        // Price range filter
        if (price_min && price_max) {
            query += ` AND p.price BETWEEN ? AND ?`;
            params.push(price_min, price_max);
        } else if (price_min) {
            query += ` AND p.price >= ?`;
            params.push(price_min);
        } else if (price_max) {
            query += ` AND p.price <= ?`;
            params.push(price_max);
        }

        // Bedrooms & bathrooms filter
        if (bedrooms) {
            query += ` AND p.bedrooms >= ?`;
            params.push(bedrooms);
        }

        if (bathrooms) {
            query += ` AND p.bathrooms >= ?`;
            params.push(bathrooms);
        }

        // Premium filter
        if (is_premium) {
            query += ` AND p.is_premium = ?`;
            params.push(is_premium === "true");
        }

        // Amenities filter
        if (amenities) {
            const amenitiesArray = amenities.split(",");
            query += ` AND a.name IN (?)`;
            params.push(amenitiesArray);
        }

        // Date availability filter
        if (checkin && checkout) {
            query += `
                AND p.id NOT IN (
                    SELECT r.property_id 
                    FROM reservations r
                    WHERE 
                        (r.start_date <= ? AND r.end_date >= ?)
                )
            `;
            params.push(checkout, checkin);
        }

        // Execute the query
        const properties = await new Promise((resolve, reject) => {
            db.query(query, params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        // Handle no properties case
        if (!properties || properties.length === 0) {
            return res.status(404).json({ error: "No properties found with the given filters." });
        }

        // Format the results
        const formattedProperties = properties.reduce((acc, prop) => {
            const { id, title, description, price, location, bedrooms, bathrooms, is_premium, created_at, image_id, image_url, amenity } = prop;

            let existingProperty = acc.find(property => property.id === id);
            if (!existingProperty) {
                existingProperty = {
                    id,
                    title,
                    description,
                    price,
                    location,
                    bedrooms,
                    bathrooms,
                    is_premium,
                    created_at,
                    images: [],
                    amenities: [],
                };
                acc.push(existingProperty);
            }

            if (image_id && image_url && !existingProperty.images.some(img => img.id === image_id)) {
                existingProperty.images.push({ id: image_id, url: image_url });
            }

            if (amenity && !existingProperty.amenities.includes(amenity)) {
                existingProperty.amenities.push(amenity);
            }

            return acc;
        }, []);

        res.status(200).json(formattedProperties);
    } catch (error) {
        console.error("Error fetching properties:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, location, bedrooms, bathrooms, is_premium, amenities } = req.body;
        const imageUrls = req.body.imageUrls; // Get image URLs from middleware

        // Input validation
        if (!title || !description || !price || !location || !bedrooms) {
            return res.status(400).json({ 
                success: false, 
                message: "Required fields are missing" 
            });
        }

        // Start transaction
        await new Promise((resolve, reject) => {
            db.beginTransaction((err) => (err ? reject(err) : resolve()));
        });

        try {
            const updateQuery = `
                UPDATE feature_property
                SET 
                    title = ?, 
                    description = ?, 
                    price = ?, 
                    location = ?, 
                    bedrooms = ?, 
                    bathrooms = ?, 
                    is_premium = ?
                WHERE id = ?
            `;

            // Convert is_premium to a number (0 or 1)
            const isPremiumValue = is_premium === 'true' || is_premium === '1' ? 1 : 0;

            await new Promise((resolve, reject) => {
                db.query(
                    updateQuery, 
                    [title, description, price, location, bedrooms, bathrooms, isPremiumValue, id], 
                    (err) => {
                        if (err) return reject(err);
                        resolve();
                    }
                );
            });

            // Handle images update if new images are provided
            if (imageUrls && imageUrls.length > 0) {
                // First delete existing images
                await new Promise((resolve, reject) => {
                    db.query('DELETE FROM property_images WHERE property_id = ?', [id], (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });

                // Insert new images
                const insertImageQuery = `
                    INSERT INTO property_images (property_id, image_url)
                    VALUES ?
                `;
                const imageValues = imageUrls.map(url => [id, url]);
                await new Promise((resolve, reject) => {
                    db.query(insertImageQuery, [imageValues], (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
            }

            // Handle amenities update
            if (amenities) {
                // First, remove existing amenities
                await new Promise((resolve, reject) => {
                    db.query('DELETE FROM property_amenities WHERE property_id = ?', [id], (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });

                // Then add new amenities
                const amenitiesList = Array.isArray(amenities) ? amenities : amenities.split(',').map(a => a.trim());
                
                if (amenitiesList.length > 0) {
                    for (const amenity of amenitiesList) {
                        // Check if amenity exists
                        const [existingAmenity] = await new Promise((resolve, reject) => {
                            db.query('SELECT id FROM amenities WHERE name = ?', [amenity], (err, result) => {
                                if (err) return reject(err);
                                resolve(result);
                            });
                        });

                        // Get amenity ID (create if doesn't exist)
                        let amenityId;
                        if (!existingAmenity) {
                            const result = await new Promise((resolve, reject) => {
                                db.query('INSERT INTO amenities (name) VALUES (?)', [amenity], (err, result) => {
                                    if (err) return reject(err);
                                    resolve(result);
                                });
                            });
                            amenityId = result.insertId;
                        } else {
                            amenityId = existingAmenity.id;
                        }

                        // Link amenity to property
                        await new Promise((resolve, reject) => {
                            db.query(
                                'INSERT INTO property_amenities (property_id, amenity_id) VALUES (?, ?)',
                                [id, amenityId],
                                (err) => {
                                    if (err) return reject(err);
                                    resolve();
                                }
                            );
                        });
                    }
                }
            }

            // Commit transaction
            await new Promise((resolve, reject) => {
                db.commit((err) => (err ? reject(err) : resolve()));
            });

            // Fetch updated property data
            const updatedProperty = await new Promise((resolve, reject) => {
                db.query(
                    'SELECT * FROM feature_property WHERE id = ?',
                    [id],
                    (err, result) => {
                        if (err) return reject(err);
                        resolve(result[0]);
                    }
                );
            });

            res.status(200).json({ 
                success: true, 
                message: "Property updated successfully",
                data: updatedProperty
            });

        } catch (error) {
            // Rollback transaction on error
            await new Promise(resolve => db.rollback(() => resolve()));
            throw error;
        }

    } catch (error) {
        console.error("Error updating property:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Failed to update property",
            error: error.message 
        });
    }
};


const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteQuery = "DELETE FROM feature_property WHERE id = ?";

        await new Promise((resolve, reject) => {
            db.query(deleteQuery, [id], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        res.status(200).json({ success: true, message: "Property deleted successfully" });
    } catch (error) {
        console.error("Error deleting property:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports={createProperty,updateProperty,getAllProperties,deleteProperty,getAllProperties,getPropertyById ,getFilteredProperties};