// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  time: String,
  title: String,
  status: String,
  instructor: String,
  attendees: Number,
  category: String, // e.g. In Progress, Upcoming
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
