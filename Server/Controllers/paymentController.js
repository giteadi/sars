const Razorpay = require("razorpay");
const crypto = require("crypto");
const { db } = require("../Config/db"); // Assuming you have a DB connection setup
require("dotenv").config();

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
  throw new Error("Missing Razorpay environment variables");
}

exports.createOrder = async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  try {
    const { amount, currency, receipt, user_id, product_ids, quantities } = req.body;
    console.log("Received order data:", req.body);

    if (!amount || !user_id || !Array.isArray(product_ids) || product_ids.length === 0) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // Convert amount to paise if in INR
    const amountInPaise = currency === 'INR' ? Math.round(amount * 100) : amount;

    // Create Razorpay order
    const options = {
      amount: amountInPaise,
      currency,
      receipt,
      notes: {
        user_id: user_id.toString(),
        products: product_ids.join(',')
      }
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ 
      order,
      totalPrice: amount,
      msg: "Order created successfully"
    });

  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ 
      msg: "Failed to create order",
      error: error.message 
    });
  }
};

// Validate Razorpay payment
exports.validatePayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      amount,
      user_id,
      product_ids
    } = req.body;
  console.log("validation body->" , req.body);
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ msg: "Missing payment details" });
    }

    // Verify signature
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Invalid payment signature" });
    }

    // Begin transaction
    await new Promise((resolve, reject) => {
      db.beginTransaction(async (err) => {
        if (err) reject(err);

        try {
          // Insert reservations
          for (const product_id of product_ids) {
            await new Promise((resolve, reject) => {
              db.query(
                `INSERT INTO reservation 
                (product_id, user_id, total_price, payment_status, payment_method, payment_id, transaction_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                  product_id,
                  user_id,
                  amount / 100, // Convert paise to rupees
                  "success",
                  "Razorpay",
                  razorpay_payment_id,
                  razorpay_order_id
                ],
                (err) => {
                  if (err) reject(err);
                  resolve();
                }
              );
            });
          }

          // Commit transaction
          db.commit((err) => {
            if (err) reject(err);
            resolve();
          });
        } catch (error) {
          db.rollback(() => reject(error));
        }
      });
    });

    res.status(200).json({
      msg: "Payment validated and reservations created",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id
    });

  } catch (error) {
    console.error("Payment validation error:", error);
    res.status(500).json({ 
      msg: "Payment validation failed",
      error: error.message 
    });
  }
};

