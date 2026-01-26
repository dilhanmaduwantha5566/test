const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const classRoutes = require("./src/routes/classRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // Allow Vercel frontend
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", require("./src/routes/paymentRoutes"));
app.use("/api/progress", require("./src/routes/progressRoutes"));

app.get("/", (req, res) => {
  res.send("Supreme Fitness Gym API is running 🚀");
});

const PORT = process.env.PORT || 5002;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Start server only if running locally
if (require.main === module) {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}

module.exports = app;
