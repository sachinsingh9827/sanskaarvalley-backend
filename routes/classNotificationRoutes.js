const express = require("express");
const router = express.Router();
const {
  createClassNotification,
  getAllClassNotifications,
  deleteClassNotification,
} = require("../controllers/classNotificationController");

// Route for creating a class notification
router.post("/", createClassNotification);

// Route for getting all class notifications
router.get("/", getAllClassNotifications);

// Route for deleting a class notification by ID
router.delete("/:id", deleteClassNotification);

module.exports = router;
