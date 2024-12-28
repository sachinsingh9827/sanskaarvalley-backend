// controllers/schoolCalendarController.js
const SchoolCalendar = require("../models/schoolCalendarModel");

// Add a new event
const addEvent = async (req, res) => {
  const { title, dates, type } = req.body;

  if (
    !title ||
    !dates ||
    !Array.isArray(dates) ||
    dates.length === 0 ||
    !type
  ) {
    return res
      .status(400)
      .json({ message: "Title, dates (array), and type are required." });
  }

  try {
    const newEvent = new SchoolCalendar({ title, dates, type });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Error adding event", error });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await SchoolCalendar.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

// Update an event by ID
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, dates, type } = req.body;

  if (
    !title ||
    !dates ||
    !Array.isArray(dates) ||
    dates.length === 0 ||
    !type
  ) {
    return res
      .status(400)
      .json({ message: "Title, dates (array), and type are required." });
  }

  try {
    const updatedEvent = await SchoolCalendar.findByIdAndUpdate(
      id,
      { title, dates, type },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};

// Delete an event by ID
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await SchoolCalendar.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};

module.exports = { addEvent, getAllEvents, updateEvent, deleteEvent };
