const Auction = require("../models/Auction");

const createAuction = async (req, res) => {
  try {
    const { title, description, startingBid, endTime } = req.body;

    const auction = await Auction.create({ title, description, startingBid, endTime });

    res.status(201).json(auction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAuction, getAuctions };
