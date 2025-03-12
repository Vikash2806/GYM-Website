const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: String,
  time: String,
  status: String, // Scheduled, Completed, Cancelled
});

module.exports = mongoose.model("Booking", BookingSchema);
