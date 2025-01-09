const express = require("express");
const { register, verifyOtp, login } = require("../Controllers/userAuth");  
const router = express.Router();

// User authentication routes
router.post("/register", register);
router.post("/verify-otp", verifyOtp); 
router.post("/login", login);

module.exports = router;