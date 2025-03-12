const mongoose = require("mongoose");

const CircularStatsSchema = new mongoose.Schema({
  type: { type: String, enum: ["scheduled", "paid", "overdue"], required: true },
  value: { type: Number, required: true },
});

module.exports = mongoose.model("CircularStats", CircularStatsSchema);
