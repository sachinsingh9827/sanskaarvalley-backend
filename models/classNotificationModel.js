const ClassNotification = require("../models/ClassNotificationModel");
const errorMessages = require("../utils/errorMessages");

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const { title, message, classId, teacherId } = req.body;

    if (!title || !message || !classId || !teacherId) {
      return res
        .status(400)
        .json({ message: errorMessages.NOTIFICATION.MISSING_CLASS });
    }

    const notification = new ClassNotification({
      title,
      message,
      classId,
      teacherId,
    });

    await notification.save();

    res.status(201).json({
      message: errorMessages.NOTIFICATION.CREATED_SUCCESS,
      notification,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({
      message: errorMessages.NOTIFICATION.CREATE_FAILED,
      error: error.message,
    });
  }
};

// Get all notifications with pagination
exports.getAllNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const notifications = await ClassNotification.find()
      .populate("classId", "name section")
      .populate("teacherId", "name email")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await ClassNotification.countDocuments();

    res.status(200).json({
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({
      message: errorMessages.NOTIFICATION.GENERAL_ERROR,
      error: error.message,
    });
  }
};

// Get notifications by class
exports.getNotificationsByClass = async (req, res) => {
  const { classId } = req.params;

  try {
    const notifications = await ClassNotification.find({ classId })
      .populate("teacherId", "name email")
      .exec();

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications for class:", error);
    res.status(500).json({
      message: errorMessages.NOTIFICATION.GENERAL_ERROR,
      error: error.message,
    });
  }
};

// Get notifications by teacher
exports.getNotificationsByTeacher = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const notifications = await ClassNotification.find({ teacherId })
      .populate("classId", "name section")
      .exec();

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications for teacher:", error);
    res.status(500).json({
      message: errorMessages.NOTIFICATION.GENERAL_ERROR,
      error: error.message,
    });
  }
};

// Update a notification
exports.updateNotification = async (req, res) => {
  const { id } = req.params;
  const { title, message, classId, teacherId } = req.body;

  try {
    const notification = await ClassNotification.findById(id);

    if (!notification) {
      return res
        .status(404)
        .json({ message: errorMessages.NOTIFICATION.NOT_FOUND });
    }

    notification.title = title || notification.title;
    notification.message = message || notification.message;
    notification.classId = classId || notification.classId;
    notification.teacherId = teacherId || notification.teacherId;

    await notification.save();

    res.status(200).json({
      message: errorMessages.NOTIFICATION.UPDATED_SUCCESS,
      notification,
    });
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).json({
      message: errorMessages.NOTIFICATION.GENERAL_ERROR,
      error: error.message,
    });
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await ClassNotification.findByIdAndDelete(id);

    if (!notification) {
      return res
        .status(404)
        .json({ message: errorMessages.NOTIFICATION.NOT_FOUND });
    }

    res
      .status(200)
      .json({ message: errorMessages.NOTIFICATION.DELETED_SUCCESS });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({
      message: errorMessages.NOTIFICATION.DELETE_FAILED,
      error: error.message,
    });
  }
};

// Get a single notification by ID
exports.getNotificationById = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await ClassNotification.findById(id)
      .populate("classId", "name section")
      .populate("teacherId", "name email");

    if (!notification) {
      return res
        .status(404)
        .json({ message: errorMessages.NOTIFICATION.NOT_FOUND });
    }

    res.status(200).json({ notification });
  } catch (error) {
    console.error("Error fetching notification by ID:", error);
    res.status(500).json({
      message: errorMessages.NOTIFICATION.GENERAL_ERROR,
      error: error.message,
    });
  }
};
