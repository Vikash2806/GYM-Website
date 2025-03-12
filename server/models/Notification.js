const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  message: String,
  date: Date,
  type: String, // Info, Warning, Success
});

module.exports = mongoose.model("Notification", NotificationSchema);
