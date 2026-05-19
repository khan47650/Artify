const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },

    approvedStatus: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },

    sellingStatus: {
      type: String,
      enum: ["pending", "sold"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artwork", artworkSchema);