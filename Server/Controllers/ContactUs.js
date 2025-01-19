const { sendUserDetailsEmail } = require("../Middleware/mail");

// Contact Us Controller
const contactUs = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate request fields
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        // Send email using nodemailer
        await sendUserDetailsEmail(name, email, message);

        // Respond to the client
        res.status(200).json({
            success: true,
            message: "Your message has been sent successfully!",
        });
    } catch (error) {
        console.error("Error in Contact Us:", error.message);
        res.status(500).json({
            success: false,
            error: "Failed to send your message. Please try again later.",
        });
    }
};

module.exports = { contactUs };
