const { db } = require("../Config/db");

const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({
                error: "User ID and Product ID are required.",
            });
        }

        // Check if the product already exists in the cart
        const checkCartQuery = `
            SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?
        `;
        const existingCartItem = await new Promise((resolve, reject) => {
            db.query(checkCartQuery, [userId, productId], (err, result) => {
                if (err) return reject(err);
                resolve(result[0]);
            });
        });

        if (existingCartItem) {
            // If the product exists, increment its quantity by 1
            const updateCartQuery = `
                UPDATE cart
                SET quantity = quantity + 1, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `;
            await new Promise((resolve, reject) => {
                db.query(updateCartQuery, [existingCartItem.id], (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });

            return res.status(200).json({
                message: "Cart updated successfully",
                cartItemId: existingCartItem.id,
            });
        } else {
            // If the product does not exist, insert it with quantity = 1
            const addToCartQuery = `
                INSERT INTO cart (user_id, product_id, quantity)
                VALUES (?, ?, ?)
            `;
            await new Promise((resolve, reject) => {
                db.query(addToCartQuery, [userId, productId, 1], (err, result) => {
                    if (err) return reject(err);
                    resolve(result.insertId);
                });
            });

            res.status(201).json({ message: "Product added to cart successfully" });
        }
    } catch (error) {
        console.error("Error in adding to cart:", error.message);
        res.status(500).json({
            success: false,
            message: "Error in adding to cart",
            error: error.message,
        });
    }
};
const getCartItems = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const getCartQuery = `
            SELECT cart.id, cart.user_id, cart.product_id, cart.quantity, cart.added_at, cart.updated_at, 
                   products.title, products.price
            FROM cart
            INNER JOIN products ON cart.product_id = products.id
            WHERE cart.user_id = ?
        `;
        const cartItems = await new Promise((resolve, reject) => {
            db.query(getCartQuery, [userId], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        res.status(200).json({ success: true, cartItems });
    } catch (error) {
        console.error("Error in fetching cart items:", error.message);
        res.status(500).json({
            success: false,
            message: "Error in fetching cart items",
            error: error.message,
        });
    }
};
const updateCartItem = async (req, res) => {
    try {
        const { cartId, quantity } = req.body;

        if (!cartId || !quantity || quantity < 1) {
            return res.status(400).json({
                error: "Cart ID and a valid quantity are required.",
            });
        }

        const updateCartQuery = `
            UPDATE cart
            SET quantity = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        await new Promise((resolve, reject) => {
            db.query(updateCartQuery, [quantity, cartId], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        res.status(200).json({ success: true, message: "Cart item updated successfully" });
    } catch (error) {
        console.error("Error in updating cart item:", error.message);
        res.status(500).json({
            success: false,
            message: "Error in updating cart item",
            error: error.message,
        });
    }
};
const deleteCartItem = async (req, res) => {
    try {
        const { cartId } = req.params;

        if (!cartId) {
            return res.status(400).json({ error: "Cart ID is required" });
        }

        const deleteCartQuery = `
            DELETE FROM cart WHERE id = ?
        `;
        await new Promise((resolve, reject) => {
            db.query(deleteCartQuery, [cartId], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        res.status(200).json({ success: true, message: "Cart item deleted successfully" });
    } catch (error) {
        console.error("Error in deleting cart item:", error.message);
        res.status(500).json({
            success: false,
            message: "Error in deleting cart item",
            error: error.message,
        });
    }
};
const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const clearCartQuery = `
            DELETE FROM cart WHERE user_id = ?
        `;
        await new Promise((resolve, reject) => {
            db.query(clearCartQuery, [userId], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        res.status(200).json({ success: true, message: "Cart cleared successfully" });
    } catch (error) {
        console.error("Error in clearing cart:", error.message);
        res.status(500).json({
            success: false,
            message: "Error in clearing cart",
            error: error.message,
        });
    }
};
module.exports = {
    addToCart,
    getCartItems,
    updateCartItem,
    deleteCartItem,
    clearCart,
};
