const express = require('express');
const { addProduct, getProducts, getProductById,updateProduct, deleteProduct } = require('../Controllers/adminAction'); 
const { imageUploader } = require("../Middleware/fileUpload");
const router = express.Router();


router.post("/addProduct", imageUploader, addProduct);
router.get('/getProducts', getProducts);
router.get('/getProductById/:id', getProductById);
router.put('/updateProductById/:id', updateProduct);
router.delete('/deleteProductById/:id', deleteProduct);

module.exports = router;
