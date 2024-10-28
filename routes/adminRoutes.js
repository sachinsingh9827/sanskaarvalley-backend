const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  forgotPassword,
} = require("../controllers/authController");

const router = express.Router();

// Admin registration route
router.post("/register", registerAdmin);
// Login route for admin
router.post("/login", loginAdmin);
// Route for logging out an admin
router.post("/logout", logoutAdmin);
router.post("/forgot-password", forgotPassword);
module.exports = router;
