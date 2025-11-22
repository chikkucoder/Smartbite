require("dotenv").config(); // Load environment variables
const Razorpay = require("razorpay");
const express = require("express");
const router = express.Router();

// Check if Razorpay keys are available
const hasRazorpayKeys = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET;

let razorpay = null;

if (hasRazorpayKeys) {
  // Initialize Razorpay only if keys are available
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  console.log("✅ Razorpay initialized successfully");
} else {
  console.warn("⚠️ Razorpay keys not found. Payment functionality will be disabled.");
}

// Create Order Route
router.post("/create-order", async (req, res) => {
  if (!razorpay) {
    return res.status(503).json({ 
      error: "Payment service not configured",
      message: "Razorpay API keys are not set" 
    });
  }

  try {
    const { amount, currency } = req.body;
    const options = {
      amount: amount * 100, // Convert to paise
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ error: "Error creating Razorpay order" });
  }
});

module.exports = router;
