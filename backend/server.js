const express = require("express");
const http = require("http"); // HTTP server for WebSockets
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize app and server
const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
    cors: {
        origin: "*", // Allow frontend to connect
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const userRoutes = require("./routes/userRoutes");
const auctionRoutes = require("./routes/auctionRoutes");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/auctions", auctionRoutes);

// ✅ Initialize Razorpay with API keys from .env
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ✅ WebSockets Logic for Live Bidding
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Listen for new bids
    socket.on("newBid", (data) => {
        console.log("New bid received:", data);

        // Broadcast updated bid to all connected users
        io.emit("updateBid", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// ✅ Create Order API (Razorpay)
app.post("/api/payments/create-order", async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100, // Convert to paisa (₹1 = 100 paisa)
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ success: false, message: "Payment failed" });
    }
});

// ✅ Verify Payment API
app.post("/api/payments/verify-payment", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const generated_signature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature === razorpay_signature) {
            res.json({ success: true, message: "Payment verified successfully!" });
        } else {
            res.status(400).json({ success: false, message: "Invalid Payment Signature" });
        }
    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({ success: false, message: "Verification failed" });
    }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
