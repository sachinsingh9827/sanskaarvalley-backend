const Notification = require("../models/notificationModel");
const errorMessages = require("../utils/errorMessages");
const { validateNotificationData } = require("../utils/notificationValidation");
const paginate = require("../utils/paginate");

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { error } = validateNotificationData(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const notification = new Notification(req.body);
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

// Get all notifications with pagination
const getAllNotifications = async (req, res) => {
  try {
    const { skip, limit, sort } = paginate(req.query);
    const totalNotifications = await Notification.countDocuments();

    const notifications = await Notification.find()
      .skip(skip)
      .limit(limit)
      .sort(sort);

    return res.status(200).json({
      currentPage: req.query.page || 1,
      totalPages: Math.ceil(totalNotifications / limit),
      totalNotifications,
      notifications,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: errorMessages.NOTIFICATION.GENERAL_ERROR });
  }
};
const deleteOldNotifications = async (req, res) => {
  try {
    // Get the current date and subtract 3 days
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000); // 3 days in milliseconds

    // Delete notifications older than 3 days
    const result = await Notification.deleteMany({
      createdAt: { $lt: threeDaysAgo },
    });

    return res.status(200).json({
      message: `Deleted ${result.deletedCount} old notifications successfully.`,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: errorMessages.NOTIFICATION.DELETE_FAILED });
  }
};
// Delete a notification by ID
const deleteNotifications = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification)
      return res
        .status(404)
        .json({ message: errorMessages.NOTIFICATION.NOT_FOUND });

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

// Update a notification by ID
const updateNotification = async (req, res) => {
  try {
    const { error } = validateNotificationData(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedNotification)
      return res
        .status(404)
        .json({ message: errorMessages.NOTIFICATION.NOT_FOUND });

    return res.status(200).json({
      message: errorMessages.NOTIFICATION.UPDATED_SUCCESS,
      updatedNotification,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: errorMessages.NOTIFICATION.UPDATE_FAILED });
  }
};

module.exports = {
  createNotification,
  getAllNotifications,
  deleteNotifications,
  updateNotification,
  deleteOldNotifications,
};
