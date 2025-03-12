// pages/Dashboard.js

import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import AttendanceChart from "../components/AttendanceChart";
import CircularStats from "../components/CircularStats";
import AnimatedBackground from "../components/AnimatedBackground";

const Dashboard = () => {
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
          {/* Circular Stats */}
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

          {/* Attendance Chart */}
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
              <AttendanceChart />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
