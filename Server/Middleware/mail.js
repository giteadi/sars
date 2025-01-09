const nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send OTP email
const sendOtpEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "aditya.satel@gmail.com", // Use the email address provided in the function call
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}. It is valid for 15 minutes.`, // Include the actual OTP
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent to:',"aditya.setal@gmail.com" ); // Log the correct recipient email
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw error;
    }
};

module.exports = { sendOtpEmail };