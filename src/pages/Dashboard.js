import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import AttendanceChart from "../components/AttendanceChart";
import CircularStats from "../components/CircularStats";
import AnimatedBackground from "../components/AnimatedBackground";
import axios from "axios";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    attendance: [],
    circularStats: {}, // Store scheduled, paid, overdue stats here
    notifications: [],
    bookings: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard");
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <AnimatedBackground />
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: "250px",
          minHeight: "100vh",
          color: "#333",
          position: "relative",
        }}
      >
        <Typography variant="h4" sx={{ color: "#BFDBFE" }} gutterBottom>
          Dashboard
        </Typography>

        {/* TOP SECTION - Stats & Attendance Chart */}
        <Grid container spacing={3}>
          {/* Circular Stats (Cleaner Implementation) */}
          <Grid item xs={12} md={6} lg={8}>
            <CircularStats data={dashboardData.circularStats} />
          </Grid>

          {/* Attendance Chart in TOP RIGHT */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{
                p: 2,
                height: "100%",
                background: "#1E293B",
                boxShadow: 3,
                borderRadius: 2,
                color: "#fff",
              }}
            >
              <Typography variant="h6">Attendance</Typography>
              <AttendanceChart data={dashboardData.attendance} />
            </Paper>
          </Grid>
        </Grid>

        {/* BOTTOM SECTION - My Bookings & Notifications */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {/* My Bookings */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                background: "#1E293B",
                boxShadow: 3,
                borderRadius: 2,
                color: "#fff",
              }}
            >
              <Typography variant="h6">My Bookings</Typography>
              {dashboardData.bookings.length > 0 ? (
                dashboardData.bookings.map((booking, index) => (
                  <Typography key={index}>🕒 {booking}</Typography>
                ))
              ) : (
                <Typography>No upcoming bookings</Typography>
              )}
            </Paper>
          </Grid>

          {/* Notifications */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                background: "#1E293B",
                boxShadow: 3,
                borderRadius: 2,
                color: "#fff",
              }}
            >
              <Typography variant="h6">Notifications</Typography>
              {dashboardData.notifications.length > 0 ? (
                dashboardData.notifications.map((note, index) => (
                  <Typography key={index}>⚠️ {note}</Typography>
                ))
              ) : (
                <Typography>No new notifications</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
