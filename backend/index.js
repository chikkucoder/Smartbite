const express = require("express");
const cors = require("cors"); 
const dotenv = require("dotenv");

// Load environment variables FIRST
dotenv.config();

const mongoDB = require("./db"); 
const app = express();
const port = process.env.PORT || 5000;

// Database initialization flag
let dbInitialized = false;

//  Use CORS middleware with proper configuration
app.use(cors({
  origin: true, // Allow all origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Middleware to ensure DB is initialized
app.use(async (req, res, next) => {
  if (!dbInitialized) {
    try {
      await mongoDB();
      dbInitialized = true;
      console.log('Database initialized successfully');
    } catch (err) {
      console.error('Database initialization failed:', err);
    }
  }
  next();
});

//  Import Routes
app.use("/api", require("./Routes/CreatUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api/payment", require("./Routes/paymentRoutes")); 
app.use("/api", require("./Routes/Chatbot"));

app.get("/", (req, res) => {
  res.json({ 
    message: "SmartBite API - Server is running",
    status: "healthy",
    dbConnected: dbInitialized
  });
});

// Only start server if not in Vercel environment
if (process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Export for Vercel serverless
module.exports = app;
