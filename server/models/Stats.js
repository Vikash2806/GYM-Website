const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema({
  type: String, // Paid, Scheduled, Overdue
  value: Number,
});

module.exports = mongoose.model("Stats", StatsSchema);
