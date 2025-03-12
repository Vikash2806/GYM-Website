const express = require("express");
const Attendance = require("../models/Attendance");
const Booking = require("../models/Booking");
const Notification = require("../models/Notification");
const Stats = require("../models/Stats");

const router = express.Router();

// Get Attendance Data
router.get("/attendance", async (req, res) => {
    try {
      let latestAttendance = await Attendance.findOne().sort({ _id: -1 }); // Fetch latest week's data
  
      // If no data exists, create dummy data
      if (!latestAttendance) {
        latestAttendance = await Attendance.create({
          week: "Week 1",
          attendance: [3, 7, 9, 6, 5, 2, 10] // Dummy data
        });
      }
  
      res.json({ attendance: latestAttendance.attendance });
    } catch (error) {
      console.error("Error fetching attendance:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });
  

// Get Bookings Data
router.get("/bookings", async (req, res) => {
  const data = await Booking.find();
  res.json(data);
});

// Get Notifications Data
router.get("/notifications", async (req, res) => {
  const data = await Notification.find();
  res.json(data);
});

// Get Stats Data
router.get("/stats", async (req, res) => {
  const data = await Stats.find();
  res.json(data);
});

module.exports = router;
