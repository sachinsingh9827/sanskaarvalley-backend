// routes/login.js
const express = require("express");
const { login } = require("../controllers/authController");

const router = express.Router();

// Login API
router.post("/login", login); // Use the login controller

// Export the router
module.exports = router;
