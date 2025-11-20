const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  marked: Boolean,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Lead", leadSchema);
