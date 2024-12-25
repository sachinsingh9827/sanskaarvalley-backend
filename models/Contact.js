// models/Contact.js
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  instagram: {
    type: String,
  },
  linkedin: {
    type: String,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
