// models/Notification.js
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["unread", "read"], default: "unread" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
