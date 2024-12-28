const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Ensure the path is correct
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

// Import route handlers
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const classRoutes = require("./routes/classRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const contact = require("./routes/contact");
const userContact = require("./routes/contactRoutes");
const mainSubject = require("./routes/mainSubjectRoutes");
const faqRoutes = require("./routes/faqRoutes");
const privacyPolicies = require("./routes/privacyPolicyRoutes");
const termsAndConditions = require("./routes/termsAndConditionsRoutes");
const careerRoutes = require("./routes/careerRoutes");
const jobRequirement = require("./routes/jobRequirementRoutes");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Serve static files for uploaded content
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route handlers
app.use("/students", studentRoutes);
app.use("/admin", adminRoutes);
app.use("/class", classRoutes);
app.use("/subjects", subjectRoutes);
app.use("/teachers", teacherRoutes);
app.use("/notifications", notificationRoutes);
app.use("/contact", contact);
app.use("/user-contact", userContact);
app.use("/main-subject", mainSubject);
app.use("/faq", faqRoutes);
app.use("/privacy-policies", privacyPolicies);
app.use("/terms-and-conditions", termsAndConditions);
app.use("/career", careerRoutes);
app.use("/job-requirement", jobRequirement);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Sanskaar Valley School Management API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
