const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    ip: String,
    country: String,
    city: String,
    region: String,
    browser: String,
    device: String,
    page: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);
