const mongoose = require("mongoose");

const classNotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  class: { type: String, required: true }, // Class identifier
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  }, // Assuming there's a Teacher model
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ClassNotification", classNotificationSchema);
