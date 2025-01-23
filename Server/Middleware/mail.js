const nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send email with user details
const sendUserDetailsEmail = async (name, email, message) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, 
        subject: 'New Message from Website',
        text: `You have received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`, 
    };

    try {
        await transporter.sendMail(mailOptions);
        // console.log('Message sent successfully to:', "aditya.satel@gmail.com");
    } catch (error) {
        console.error('Error sending message email:', error);
        throw error;
    }
};

module.exports = { sendUserDetailsEmail };
