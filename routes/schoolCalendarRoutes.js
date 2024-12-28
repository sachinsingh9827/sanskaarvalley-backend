// routes/schoolCalendarRoutes.js
const express = require("express");
const router = express.Router();
const {
  addEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/schoolCalendarController");

// Route to add a new event
router.post("/", addEvent);

// Route to get all events
router.get("/", getAllEvents);

// Route to update an event by ID
router.put("/:id", updateEvent);

// Route to delete an event by ID
router.delete("/:id", deleteEvent);

module.exports = router;
