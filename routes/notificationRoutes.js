const express = require("express");
const {
  createNotification,
  getAllNotifications,
  updateNotification,
  deleteNotifications,
} = require("../controllers/notificationController");

const router = express.Router();

// Route to create a new notification
router.post("/", createNotification);

// Route to get all notifications with pagination
router.get("/", getAllNotifications);

// Route to update notification by ID
router.put("/:id", updateNotification); // Ensure this is correct

// Route to delete notification by ID
router.delete("/:id", deleteNotifications);

module.exports = router;
