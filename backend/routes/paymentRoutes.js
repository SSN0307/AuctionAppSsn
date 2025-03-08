import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🛒 Create an Order
router.post("/create-order", async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency: currency || "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
