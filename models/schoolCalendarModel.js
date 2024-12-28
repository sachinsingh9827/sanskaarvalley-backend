// models/schoolCalendarModel.js
const mongoose = require("mongoose");

const schoolCalendarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  dates: {
    type: [Date], // Array of dates
    required: true,
  },
  type: {
    type: String,
    enum: ["holiday", "event"], // Restrict to these two values
    required: true,
  },
});

const SchoolCalendar = mongoose.model("SchoolCalendar", schoolCalendarSchema);

module.exports = SchoolCalendar;
