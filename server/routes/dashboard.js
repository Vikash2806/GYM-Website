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
// Dummy booking data
const dummyBookings = [
  {
    time: '1:30PM',
    title: 'Private lesson',
    status: 'Scheduled',
    instructor: 'Rory Almond',
    attendees: 1,
    category: 'Today',
  },
  {
    time: '6:00PM',
    title: 'Basics No-GI',
    status: 'In Progress',
    instructor: 'Rory Almond',
    attendees: 4,
    category: 'Today',
  },
  {
    time: '7:30PM',
    title: 'Sparring',
    status: 'Upcoming',
    instructor: 'Steven Seagal',
    attendees: 3,
    category: 'Upcoming',
  },
  {
    time: '9:00PM',
    title: 'Advanced Class',
    status: 'Upcoming',
    instructor: 'Bruce Lee',
    attendees: 2,
    category: 'Upcoming',
  },
];

// GET /api/bookings
router.get("/bookings", async (req, res) => {
  try {
    let bookings = await Booking.find().sort({ createdAt: -1 }).limit(10);

    if (bookings.length === 0) {
      const dummyBookings = [
        {
          time: '1:30PM',
          title: 'Private lesson',
          status: 'Scheduled',
          instructor: 'Rory Almond',
          attendees: 1,
          category: 'Today',
        },
        {
          time: '6:00PM',
          title: 'Basics No-GI',
          status: 'In Progress',
          instructor: 'Rory Almond',
          attendees: 4,
          category: 'Today',
        },
        {
          time: '7:30PM',
          title: 'Sparring',
          status: 'Upcoming',
          instructor: 'Steven Seagal',
          attendees: 3,
          category: 'Upcoming',
        },
        {
          time: '9:00PM',
          title: 'Advanced Class',
          status: 'Upcoming',
          instructor: 'Bruce Lee',
          attendees: 2,
          category: 'Upcoming',
        },
      ];

      await Booking.insertMany(dummyBookings);
      console.log("✅ Inserted dummy booking data");

      bookings = await Booking.find().sort({ createdAt: -1 }).limit(10);
    }

    res.json(bookings);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get Notifications Data
router.get("/notifications", async (req, res) => {
  try {
    let notifications = await Notification.find().sort({ date: -1 }).limit(5); // Get latest 5 notifications

    // Check if notifications exist
    if (notifications.length === 0) {
      const dummyNotifications = [
        { message: "New event scheduled for next week!", date: new Date(), type: "info" },
        { message: "Reminder: Payment due in 3 days", date: new Date(), type: "warning" },
        { message: "Your subscription has been successfully renewed!", date: new Date(), type: "success" },
      ];

      // Insert dummy notifications
      await Notification.insertMany(dummyNotifications);
      console.log("✅ Inserted dummy notifications data");

      // Fetch again after inserting
      notifications = await Notification.find().sort({ date: -1 }).limit(5);
    }

    res.json(notifications);
  } catch (error) {
    console.error("❌ Error fetching notifications:", error);
    res.status(500).json({ error: "Server error" });
  }
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
