const mongoose = require("../../config/mongodb");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
