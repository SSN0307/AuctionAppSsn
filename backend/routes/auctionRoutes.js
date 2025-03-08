const express = require("express");
const { placeBid } = require("../controllers/auctionController");

const router = express.Router();

module.exports = (io) => {
    router.post("/bid", (req, res) => placeBid(req, res, io));
    return router;
};
