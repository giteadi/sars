const express = require("express");
const { body } = require("express-validator");
const { createOrder, validatePayment } = require("../Controllers/paymentController");

const router = express.Router();

// Middleware for order creation validation
const validateOrder = [
  body("amount").isNumeric().withMessage("Amount must be a number"),
  body("currency").isString().withMessage("Currency must be a string"),
  body("receipt").isString().withMessage("Receipt must be a string"),
];

// Middleware for payment validation
const validatePaymentRequest = [
  body("razorpay_order_id").isString().withMessage("Order ID is required"),
  body("razorpay_payment_id").isString().withMessage("Payment ID is required"),
  body("razorpay_signature").isString().withMessage("Signature is required"),
];

// Route to create an order
router.post("/order", validateOrder, createOrder);

// Route to validate a payment
router.post("/validate", validatePaymentRequest, validatePayment);

module.exports = router;