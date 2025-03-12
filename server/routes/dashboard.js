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
    const { type } = req.params;

    // Try finding the stat
    let stat = await CircularStats.findOne({ type });

    // Check if stat doesn't exist
    if (!stat) {
      const totalCount = await CircularStats.countDocuments();

      // If DB is empty, insert dummy data
      if (totalCount === 0) {
        const dummyData = [
          { type: "scheduled", value: 1200 },
          { type: "paid", value: 800 },
          { type: "overdue", value: 400 },
        ];
        await CircularStats.insertMany(dummyData);
        console.log("✅ Inserted dummy circular stats data");

        // Try fetching again
        stat = await CircularStats.findOne({ type });
      }
    }

    if (stat) {
      res.json({ value: stat.value });
    } else {
      res.status(404).json({ error: "Stat not found" }); 
    }
  } catch (error) {
    console.error("❌ Error fetching circular stats:", error);
    res.status(500).json({ error: "Server error" });
  }
});

 
module.exports = router;
