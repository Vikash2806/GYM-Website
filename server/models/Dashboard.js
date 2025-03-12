const mongoose = require("mongoose");

const DashboardSchema = new mongoose.Schema({
  scheduled: { type: Number, required: true },
  paid: { type: Number, required: true },
  overdue: { type: Number, required: true },
  notifications: [{ type: String }],
  attendance: [{ date: String, present: Boolean }]
});

module.exports = mongoose.model("Dashboard", DashboardSchema);
