// controllers/contactController.js
const { json } = require("express");
const Contact = require("../models/contactModel");
const errorMessages = require("../utils/errorMessages"); // Import error messages

// Create a new contact message
const createContactMessage = async (req, res) => {
  try {
    const { name, mobile, email, address, message } = req.body;

    // Basic validation
    if (!name || !mobile || !email || !address || !message) {
      return res
        .status(400)
        .json({ message: errorMessages.CONTACT.ALL_FIELDS_REQUIRED });
    }

    // Create a new contact message
    const contactMessage = new Contact({
      name,
      mobile,
      email,
      address,
      message,
    });

    await contactMessage.save();
    return res
      .status(201)
      .json({ message: errorMessages.CONTACT.MESSAGE_SEND_SUCCESS });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: errorMessages.CONTACT.MESSAGE_SEND_FAILED });
  }
};

const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters

    // Find and delete the contact message
    const result = await Contact.findByIdAndDelete(id);

    // Check if the message was found and deleted
    if (!result) {
      return res
        .status(404)
        .json({ message: errorMessages.CONTACT.CONTACT_NOT_FOUND });
    }

    return res
      .status(200)
      .json({ message: errorMessages.CONTACT.MESSAGE_DELETED_SUCCESS });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: errorMessages.CONTACT.MESSAGE_SEND_FAILED });
  }
}; // Get all contact messages
const getAllContactMessages = async (req, res) => {
  try {
    const contacts = await Contact.find(); // Fetch all contact messages
    return res.status(200).json(contacts);
    // Return the list of contacts
  } catch (error) {
    return res
      .status(500)
      .json({ message: errorMessages.CONTACT.MESSAGE_SEND_FAILED });
  }
};
module.exports = {
  createContactMessage,
  deleteContactMessage,
  getAllContactMessages,
};
