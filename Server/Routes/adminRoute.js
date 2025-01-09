const express = require('express');
const { addProperty, getProperties, updateProperty, deleteProperty } = require('../Controllers/adminAction'); // Assuming you named the controller file propertyController.js
const { imageUploader } = require("../Middleware/fileUpload");
const router = express.Router();

// Route to add a new property
router.post("/addProperty", imageUploader, addProperty);

// Route to get all properties
router.get('/properties', getProperties);

// Route to update a property by ID
router.put('/properties/:id', updateProperty);

// Route to delete a property by ID
router.delete('/properties/:id', deleteProperty);

module.exports = router;
