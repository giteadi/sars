const express = require("express");
const {
    addToCart,
    getCartItems,
    updateCartItem,
    deleteCartItem,
    clearCart,
} = require("../Controllers/cartController");

const router = express.Router();

// Route to add a product to the cart
router.post("/addCart", addToCart);

// Route to get all cart items for a specific user
router.get("/cart/:userId", getCartItems);

// Route to update the quantity of a specific cart item
router.put("/cart", updateCartItem);

// Route to delete a specific cart item
router.delete("/cart/:cartId", deleteCartItem);

// Route to clear all cart items for a specific user
router.delete("/cart/clear/:userId", clearCart);

module.exports = router;
