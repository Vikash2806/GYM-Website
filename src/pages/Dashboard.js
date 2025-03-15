import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import AttendanceChart from "../components/AttendanceChart";
import CircularStats from "../components/CircularStats";
import AnimatedBackground from "../components/AnimatedBackground";
import NotificationBox from "../components/Notification";
import Bookings from "../components/Bookings"; // ✅ Import Bookings
import BottomBar from "../components/BottomBar";

const Dashboard = () => {
  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
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
          overflow: "hidden",
          pb: "40px",
        }}
      >
        <Typography variant="h4" sx={{ color: "#BFDBFE" }} gutterBottom>
          Dashboard
        </Typography>

        {/* TOP ROW - Circular Stats + Attendance */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Grid container spacing={3}>
              <Grid item>
                <CircularStats label="Scheduled" color="#3B82F6" type="scheduled" />
              </Grid>
              <Grid item>
                <CircularStats label="Paid" color="#06B6D4" type="paid" />
              </Grid>
              <Grid item>
                <CircularStats label="Overdue" color="#8B5CF6" type="overdue" />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{
                p: 2,
                background: "#1E293B",
                boxShadow: 3,
                borderRadius: 2,
                color: "#fff",
              }}
            >
              <Typography variant="h6">Attendance</Typography>
              <AttendanceChart />
            </Paper>
          </Grid>
        </Grid>

        {/* BOTTOM ROW - Bookings + Notifications */}
        <Grid container spacing={3} mt={1}>
          {/* Bookings */}
          <Grid item xs={12} md={6} lg={8}>
            <Bookings />
          </Grid>

          {/* Notifications */}
          <Grid item xs={12} md={6} lg={4}>
            <NotificationBox />
          </Grid>
        </Grid>
      </Box>

      {/* Bottom Bar */}
      <BottomBar />
    </Box>
  );
};

export default Dashboard;
