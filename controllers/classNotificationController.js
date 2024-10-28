const ClassNotification = require("../models/classNotificationModel");
const errorMessages = require("../utils/errorMessages");

// Create a new class notification
const createClassNotification = async (req, res) => {
  try {
    const { title, message, class: className } = req.body;
    const teacherId = req.user._id; // Assuming you have middleware that adds the authenticated user's ID

    // Basic validation
    if (!title || !message || !className) {
      return res
        .status(400)
        .json({ message: errorMessages.NOTIFICATION.MISSING_CLASS });
    }

    const notification = new ClassNotification({
      title,
      message,
      class: className,
      teacherId,
    });

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

// Get all class notifications
const getAllClassNotifications = async (req, res) => {
  try {
    const notifications = await ClassNotification.find();
    return res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: errorMessages.NOTIFICATION.GENERAL_ERROR });
  }
};

// Delete a class notification by ID
const deleteClassNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await ClassNotification.findByIdAndDelete(id);

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
  createClassNotification,
  getAllClassNotifications,
  deleteClassNotification,
};
