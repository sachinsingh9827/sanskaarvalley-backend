// controllers/notificationController.js
const Notification = require("../models/notificationModel");
const errorMessages = require("../utils/errorMessages");

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { title, message } = req.body;

    // Basic validation
    if (!title || !message) {
      return res
        .status(400)
        .json({ message: errorMessages.NOTIFICATION.GENERAL_ERROR });
    }

    const notification = new Notification({ title, message });
    await notification.save();

    return res
      .status(201)
      .json({ message: errorMessages.NOTIFICATION.CREATED_SUCCESS });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: errorMessages.NOTIFICATION.CREATE_FAILED });
  }
};

// Get all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    return res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: errorMessages.NOTIFICATION.GENERAL_ERROR });
  }
};

// Delete a notification by ID
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res
        .status(404)
        .json({ message: errorMessages.NOTIFICATION.NOT_FOUND });
    }

    return res
      .status(200)
      .json({ message: errorMessages.NOTIFICATION.DELETED_SUCCESS });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: errorMessages.NOTIFICATION.DELETE_FAILED });
  }
};

module.exports = {
  createNotification,
  getAllNotifications,
  deleteNotification,
};
