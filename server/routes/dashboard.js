const express = require("express");
const Attendance = require("../models/Attendance");
const Booking = require("../models/Booking");
const Notification = require("../models/Notification");
const CircularStats = require("../models/CircularStats");

const router = express.Router();

// Get Attendance Data
router.get("/attendance", async (req, res) => {
    try {
      let latestAttendance = await Attendance.findOne().sort({ _id: -1 }); // Fetch latest week's data
  
      // If no data exists, create dummy data
      if (!latestAttendance) {
        latestAttendance = await Attendance.create({
          week: "Week 1",
          attendance: [3, 7, 9, 6, 5, 2, 6] // Dummy data
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
router.get("/circular-stats/:type", async (req, res) => {
    try {
      let stat = await CircularStats.findOne({ type: req.params.type });
  
      // If no data exists, insert dummy data
      if (!stat) {
        const dummyValues = {
          scheduled: 1200,
          paid: 800,
          overdue: 400,
        };
  
        const newStat = new CircularStats({
          type: req.params.type,
          value: dummyValues[req.params.type] || 0, // Default to 0 if invalid type
        });
  
        await newStat.save();
        stat = newStat; // Use the newly created document
      }
  
      res.json({ value: stat.value });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
 
module.exports = router;
