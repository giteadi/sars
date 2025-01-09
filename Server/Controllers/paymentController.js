const Razorpay = require("razorpay");
const crypto = require("crypto");
const { db } = require("../Config/db"); // Assuming you have a DB connection setup
require("dotenv").config();

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
  throw new Error("Missing Razorpay environment variables");
}

// Create an order
exports.createOrder = (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const {
    amount,
    currency,
    receipt,
    user_id,
    property_id,
    start_date,
    end_date,
    guest,  // Add guest to the request body
  } = req.body;
  // Validate request body
  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ msg: "Invalid amount" });
  }
  if (!currency || typeof currency !== "string") {
    return res.status(400).json({ msg: "Invalid currency" });
  }
  if (!receipt || typeof receipt !== "string") {
    return res.status(400).json({ msg: "Invalid receipt ID" });
  }
  if (!start_date || !end_date) {
    return res.status(400).json({ msg: "Start and end dates are required" });
  }
  if (!guest || typeof guest !== "number" || guest <= 0) {  // Validate guest count
    return res.status(400).json({ msg: "Invalid guest count" });
  }

  const options = { amount: amount * 100, currency, receipt };

  razorpay.orders.create(options, (err, order) => {
    if (err) {
      console.error("Error in createOrder:", err.message);
      return res.status(500).json({ msg: "Order creation failed" });
    }

    // Return Razorpay order details to front-end
    res.status(200).json(order);
  });
};

// Validate payment

exports.validatePayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, currency, user_id, property_id, start_date, end_date, guest } = req.body;
  // Validate input
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ msg: "Invalid payment validation parameters" });
  }

  try {
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Invalid payment signature" });
    }

    // Payment is valid, proceed to insert the reservation
    const reservationQuery = `
      INSERT INTO reservations 
      (property_id, user_id, start_date, end_date, total_price, payment_status, 
      payment_method, payment_id, transaction_id, guest, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    const reservationValues = [
      property_id,
      user_id,
      start_date,
      end_date,
      amount/100,
      "success",  // Payment status is success after validation
      "Razorpay", // Payment method
      razorpay_order_id,  // payment_id (Razorpay order ID)
      razorpay_payment_id,  // transaction_id (Razorpay payment ID)
      guest,  // Add guest count to reservation
    ];

    db.query(reservationQuery, reservationValues, (err, result) => {
      if (err) {
        console.error("Error inserting reservation:", err.message);
        return res.status(500).json({ msg: "Failed to create reservation" });
      }

      // Return success response
      res.status(200).json({
        msg: "Payment validation successful and reservation created",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });
    });
  } catch (err) {
    console.error("Error in validatePayment:", err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
