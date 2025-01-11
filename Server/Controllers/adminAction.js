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

// Update Product (Wood Gate)
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, dimension, services } = req.body;

        let imageUrl = null;
        if (req.file) {
            imageUrl = req.file.path; // If new image is uploaded, get the image URL
        }

        // SQL query to update the product (wood gate) in the `products` table
        const updateQuery = `
            UPDATE products 
            SET title = ?, description = ?, price = ?, dimension = ?, services = ?, image_url = ?
            WHERE id = ?
        `;
        const updateValues = [title, description, price, dimension, services, imageUrl, id];

        await new Promise((resolve, reject) => {
            db.query(updateQuery, updateValues, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        console.error("Error in updating product:", error.message);
        res.status(500).json({ success: false, message: "Error in updating product", error: error.message });
    }
};

// Delete Product (Wood Gate) from `products` Table
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // SQL query to delete the product from the `products` table
        const deleteQuery = "DELETE FROM products WHERE id = ?";
        await new Promise((resolve, reject) => {
            db.query(deleteQuery, [id], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error in deleting product:", error.message);
        res.status(500).json({ success: false, message: "Error in deleting product", error: error.message });
    }
};

module.exports = { addProduct, getProducts, updateProduct, deleteProduct };
