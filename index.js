const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Ensure the path is correct
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const classRoutes = require("./routes/classRoutes");
const subjectRoutes = require("./routes/subjectRoutes"); // Import class routes
const cors = require("cors");
const helmet = require("helmet");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Serve static files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/students", studentRoutes);
app.use("/admin", adminRoutes);
app.use("/class", classRoutes); // Use class routes here
// Routes
app.use("/subjects", subjectRoutes);
// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Sanskaar Valley School Management API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
