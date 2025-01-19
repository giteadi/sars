const express = require("express");
const { contactUs } = require("../Controllers/ContactUs");

const router = express.Router();

// POST route for Contact Us
router.post("/contact", contactUs);

module.exports = router;
