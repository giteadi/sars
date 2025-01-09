const express = require("express");
const { db } = require("../Config/db");
const { sendOtpEmail } = require("../Middleware/mail");

const otpStore = new Map();  
const tempUserStore = new Map(); 

// Function to send OTP
const sendOtp = async (email) => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    const otpExpiryTime = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes

    otpStore.set(email, { otp: generatedOtp, otpExpiryTime }); // Save OTP with expiry
    console.log(`Generated OTP for ${email}: ${generatedOtp}`); // Debugging log

    await sendOtpEmail(email, generatedOtp); // Send OTP to user's email
    console.log(`OTP sent to ${email}`); // Confirmation log

    return { otpExpiryTime };
};

// Registration Endpoint
const register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, role = "user" } = req.body;

        // Check for required fields
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if the user already exists
        const existingUserQuery = "SELECT * FROM userdata WHERE email = ?";
        const existingUser = await new Promise((resolve, reject) => {
            db.query(existingUserQuery, [email], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        if (existingUser.length > 0) {
            return res.status(400).json({ error: "User already exists." });
        }

        // Handle admin role with OTP logic
        if (role === "admin") {
            const { otpExpiryTime } = await sendOtp(email);
            tempUserStore.set(email, { name, password, role });
            return res.status(200).json({
                message: "OTP sent to your email. Please verify to complete registration.",
                otpExpiryTime,
            });
        }

        // Save user for non-admin roles
        await saveUser(name, email, password, role, res);
    } catch (error) {
        console.error("Error in registration:", error.message);
        res.status(500).json({
            success: false,
            message: "Error in registration",
            error: error.message,
        });
    }
};

// Helper function to save user to the database
const saveUser = async (name, email, password, role, res) => {
    const insertUserQuery = "INSERT INTO userdata (name, email, password, role) VALUES (?, ?, ?, ?)";
    await new Promise((resolve, reject) => {
        db.query(insertUserQuery, [name, email, password, role], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: { name, email, role }, // Include role in response
    });
};

// OTP Verification Endpoint
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    const storedData = otpStore.get(email);
    if (!storedData) {
        return res.status(400).json({ success: false, message: "No OTP found for this email." });
    }

    const { otp: storedOtp, otpExpiryTime } = storedData;

    if (otp == storedOtp && Date.now() < otpExpiryTime) {
        otpStore.delete(email); // Clear OTP after verification

        // Retrieve user data from temp store and save it to the database
        const userData = tempUserStore.get(email);
        if (userData) {
            const { name, password, role } = userData;

            try {
                // Save verified admin user to the database
                await saveUser(name, email, password, role, res);
                tempUserStore.delete(email); // Clear temporary data
            } catch (error) {
                console.error("Error saving user:", error.message);
                return res.status(500).json({ 
                    success: false, 
                    message: "Error saving user to the database." 
                });
            }
        } else {
            return res.status(400).json({ success: false, message: "User data not found." });
        }
    } else {
        return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
    }
};

// Login Endpoint
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const trimmedPassword = password.trim();
        const findUserQuery = "SELECT * FROM userdata WHERE email = ?";

        const user = await new Promise((resolve, reject) => {
            db.query(findUserQuery, [email], (err, result) => {
                if (err) return reject(err);
                resolve(result.length ? result[0] : null);
            });
        });

        if (!user) {
            return res.status(400).json({ error: "User does not exist." });
        }

        if (trimmedPassword === user.password.trim()) {
            return res.status(200).json({
                success: true,
                message: "Login successful",
                user: { user_id:user.user_id,name: user.name, email: user.email, role: user.role,biirthdate:user.birthdate,number:user.phone_number,age:user.age }, // Include role in response
            });
        } else {
            return res.status(401).json({ error: "Invalid credentials." });
        }
    } catch (error) {
        console.error("Error in login:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

module.exports = { register, verifyOtp, login };
