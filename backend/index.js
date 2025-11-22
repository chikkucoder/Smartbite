const express = require("express");
const cors = require("cors"); 
const dotenv = require("dotenv");

// Load environment variables FIRST
dotenv.config();

const mongoDB = require("./db"); 
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});

//  Use CORS middleware
app.use(cors({
  origin: ["http://localhost:3000", "https://smartbite-phi.vercel.app", "https://smartbite*.vercel.app"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

//  Import Routes
app.use("/api", require("./Routes/CreatUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api/payment", require("./Routes/paymentRoutes")); 
app.use("/api", require("./Routes/chatbot"));

app.get("/", (req, res) => {
  res.send("SmartBite API - Server is running");
});

// Only start server if not in Vercel environment
if (process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Export for Vercel serverless
module.exports = app;
