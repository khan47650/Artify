const Activity = require("../models/Activity");

exports.createActivity = async (req, res) => {
    try {
        const { title, description, userId, type } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        const activity = await Activity.create({
            title,
            description,
            userId: userId || null,
            type: type || "general",
        });

        res.status(201).json({
            message: "Activity created successfully",
            activity,
        });
    } catch (error) {
        res.status(500).json({ message: "Activity create failed", error: error.message });
    }
};

exports.getUserActivities = async (req, res) => {
    try {
        const { userId } = req.params;

        const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const activities = await Activity.find({
            createdAt: { $gte: last24Hours },
            $or: [{ userId }, { userId: null }],
        }).sort({ createdAt: -1 });

        res.json({ activities });
    } catch (error) {
        res.status(500).json({
            message: "Activities fetch failed",
            error: error.message,
        });
    }
};

exports.getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find()
            .populate("userId", "firstName lastName email role")
            .sort({ createdAt: -1 });

        res.json({ activities });
    } catch (error) {
        res.status(500).json({ message: "Activities fetch failed", error: error.message });
    }
};