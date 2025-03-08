const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startingBid: { type: Number, required: true },
    highestBid: { type: Number, default: 0 },
    bids: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        amount: { type: Number, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    endTime: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auction", auctionSchema);
