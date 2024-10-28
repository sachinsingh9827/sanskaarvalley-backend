// routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const {
  createNotification,
  getAllNotifications,
  deleteNotification,
} = require("../controllers/notificationController");

// Route for creating a notification
router.post("/", createNotification);

// Route for getting all notifications
router.get("/", getAllNotifications);

// Route for deleting a notification by ID
router.delete("/:id", deleteNotification);

module.exports = router;
