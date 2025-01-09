const express = require("express");
const router = express.Router();
const { 
    createProperty, 
    updateProperty, 
    getAllProperties, 
    deleteProperty, 
    getPropertyById,
    getFilteredProperties
} = require("../Controllers/propertyController");
const { imageUploader } = require('../Middleware/fileUpload');
// Route to create a new property
router.post("/createProperty", imageUploader, createProperty);

// Route to fetch all properties
router.get("/getAllProperties", getAllProperties);

// Route to fetch a single property by ID
router.get("/getPropertyById/:id", getPropertyById);

// Route to update a property by ID
router.put("/updatePropertyById/:id", updateProperty);

// Route to delete a property by ID
router.delete("/deletePropertyById/:id", deleteProperty);

router.get("/getFilteredProperties",getFilteredProperties)
module.exports = router;
