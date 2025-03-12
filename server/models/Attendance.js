const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  week: String, // Example: "Week 1", "Week 2"
  attendance: [Number] // Stores attendance for Mon-Sun
});

// Create model
const Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = Attendance;
