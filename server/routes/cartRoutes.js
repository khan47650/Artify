const express = require("express");
const {
    addToCart,
    getUserCart,
    removeFromCart,
    clearCart,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", addToCart);
router.get("/:userId", getUserCart);
router.delete("/clear/:userId", clearCart);
router.delete("/:id", removeFromCart);

module.exports = router;