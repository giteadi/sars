const { db } = require("../Config/db");

const addProduct = async (req, res) => {
    try {
        const { title, description, price, dimension, services, imageUrls } = req.body;

        // Validate input fields
        if (!title || !description || !price || !dimension || !services || !imageUrls || !Array.isArray(imageUrls)) {
            return res.status(400).json({ error: "All fields including images are required, and images must be an array" });
        }

        // Insert the product into the `products` table
        const productQuery = `
            INSERT INTO products (title, description, price, dimension, services)
            VALUES (?, ?, ?, ?, ?)
        `;
        const productValues = [title, description, price, dimension, services];

        const productId = await new Promise((resolve, reject) => {
            db.query(productQuery, productValues, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            });
        });

        // Insert multiple images into the `product_images` table
        const imageInsertQuery = `
            INSERT INTO product_images (product_id, image_url)
            VALUES (?, ?)
        `;
        for (const imageUrl of imageUrls) {
            await new Promise((resolve, reject) => {
                db.query(imageInsertQuery, [productId, imageUrl], (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });
        }

        res.status(201).json({ message: "Product and images added successfully", productId });
    } catch (error) {
        console.error("Error in adding product:", error.message);
        res.status(500).json({ success: false, message: "Error in adding product", error: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const productQuery = `
            SELECT * FROM products
        `;
        
        const products = await new Promise((resolve, reject) => {
            db.query(productQuery, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        res.status(200).json({ products });
    } catch (error) {
        console.error("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Error in fetching products", error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Query to fetch product details
        const productQuery = `
            SELECT * FROM products WHERE id = ?
        `;

        const product = await new Promise((resolve, reject) => {
            db.query(productQuery, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result[0]);
            });
        });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Query to fetch associated images
        const imagesQuery = `
            SELECT image_url FROM product_images WHERE product_id = ?
        `;

        const images = await new Promise((resolve, reject) => {
            db.query(imagesQuery, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result.map((row) => row.image_url));
            });
        });

        res.status(200).json({ product, images });
    } catch (error) {
        console.error("Error in fetching product by ID:", error.message);
        res.status(500).json({ success: false, message: "Error in fetching product by ID", error: error.message });
    }
};

const updateProduct = async (req, res) => {
    // Update product logic...
};

const deleteProduct = async (req, res) => {
    // Delete product logic...
};

module.exports = { addProduct, getProducts, getProductById, updateProduct, deleteProduct };
