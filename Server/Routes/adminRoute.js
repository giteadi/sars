const express = require('express');
const { addProduct, getProducts, updateProduct, deleteProduct } = require('../Controllers/adminAction'); // Updated Controller file
const { imageUploader } = require("../Middleware/fileUpload");
const router = express.Router();

// Route to add a new product (Wood Gate)
router.post("/addProduct", imageUploader, addProduct);

// Route to get all products (Wood Gates)
router.get('/getProducts', getProducts);

// Route to update a product by ID
router.put('/updateProductById/:id', updateProduct);

// Route to delete a product by ID
router.delete('/deleteProductById/:id', deleteProduct);

module.exports = router;
