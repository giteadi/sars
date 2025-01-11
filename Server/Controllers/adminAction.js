const { db } = require("../Config/db");

// Add Product (Wood Gate)
const addProduct = async (req, res) => {
    try {
        const { title, description, price, dimension, services } = req.body;

        // Ensure required fields and the image are present
        if (!title || !description || !price || !dimension || !services || !req.file) {
            return res.status(400).json({ error: "All fields and image are required" });
        }

        // Get the image URL from the uploaded file
        const imageUrl = req.file.path; // Assuming the file upload middleware stores the image URL in req.file.path

        // SQL query to insert the product (wood gate) into the `products` table
        const productQuery = `
            INSERT INTO products (title, description, image, price, dimension, services, image_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const productValues = [title, description, req.file.filename, price, dimension, services, imageUrl];

        const productId = await new Promise((resolve, reject) => {
            db.query(productQuery, productValues, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            });
        });

        res.status(201).json({ message: "Product added successfully", productId });
    } catch (error) {
        console.error("Error in adding product:", error.message);
        res.status(500).json({ success: false, message: "Error in adding product", error: error.message });
    }
};

// Get Products (Wood Gates)
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
