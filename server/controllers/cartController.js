const Cart = require("../models/Cart");
const Artwork = require("../models/Artwork");
const User = require("../models/User");

exports.addToCart = async (req, res) => {
    try {
        const { userId, artworkId } = req.body;

        if (!userId || !artworkId) {
            return res.status(400).json({ message: "UserId and artworkId are required" });
        }

        const user = await User.findById(userId);

        if (!user || user.role !== "buyer") {
            return res.status(403).json({ message: "Only buyers can add artworks to cart" });
        }

        const artwork = await Artwork.findById(artworkId).populate("userId", "accountStatus");

        if (!artwork) {
            return res.status(404).json({ message: "Artwork not found" });
        }

        if (artwork.approvedStatus !== "approved") {
            return res.status(400).json({ message: "Artwork is not approved yet" });
        }

        if (artwork.sellingStatus === "sold") {
            return res.status(400).json({ message: "Artwork is already sold" });
        }

        if (artwork.userId?.accountStatus === "freeze") {
            return res.status(400).json({ message: "This seller account is frozen" });
        }

        const existing = await Cart.findOne({ userId, artworkId });

        if (existing) {
            return res.status(409).json({ message: "Artwork already exists in cart" });
        }

        const cartItem = await Cart.create({ userId, artworkId });

        res.status(201).json({
            message: "Artwork added to cart",
            cartItem,
        });
    } catch (error) {
        res.status(500).json({ message: "Add to cart failed", error: error.message });
    }
};

exports.getUserCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cartItems = await Cart.find({ userId })
            .populate({
                path: "artworkId",
                populate: {
                    path: "userId",
                    select: "firstName lastName accountStatus",
                },
            })
            .sort({ createdAt: -1 });

        const filtered = cartItems.filter(
            (item) =>
                item.artworkId &&
                item.artworkId.approvedStatus === "approved" &&
                item.artworkId.sellingStatus !== "sold" &&
                item.artworkId.userId?.accountStatus !== "freeze"
        );

        const totalPrice = filtered.reduce(
            (sum, item) => sum + Number(item.artworkId.price || 0),
            0
        );

        res.json({
            cartItems: filtered,
            totalItems: filtered.length,
            totalPrice,
        });
    } catch (error) {
        res.status(500).json({ message: "Cart fetch failed", error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Cart.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.json({ message: "Item removed from cart" });
    } catch (error) {
        res.status(500).json({ message: "Remove cart item failed", error: error.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const { userId } = req.params;

        await Cart.deleteMany({ userId });

        res.json({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).json({ message: "Clear cart failed", error: error.message });
    }
};