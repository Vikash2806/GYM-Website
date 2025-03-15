import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Paper, Typography } from "@mui/material";

// ✅ Register required elements
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AttendanceChart = () => {
  const [attendanceData, setAttendanceData] = useState([0, 0, 0, 0, 0, 0, 0]); // Default empty data

  useEffect(() => {
    // Fetch attendance data
    axios
      .get("http://localhost:5000/api/dashboard/attendance")
      .then((response) => {
        setAttendanceData(response.data.attendance);
      })
      .catch((error) => console.error("Error fetching attendance:", error));
  }, []);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Attendance",
        data: attendanceData, // ✅ Data from API
        backgroundColor: [
          "#93C5FD", // Light blue
          "#60A5FA", // Medium light blue
          "#3B82F6", // Main blue
          "#2563EB", // Deep blue
          "#1E40AF", // Slightly darker blue
          "#1D4ED8", // Bright navy
          "#3B82F6", // Repeated main blue for consistency
        ],
        borderRadius: 6, // Smooth edges
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Prevents stretching
    plugins: {
      legend: {
        display: false, // Hide legend for cleaner UI
      },
      tooltip: {
        backgroundColor: "#1E293B",
        titleColor: "#F8FAFC",
        bodyColor: "#D1D5DB",
        borderWidth: 1,
        borderColor: "#3B82F6",
      },
    },
    scales: {
      x: {
        grid: { display: false }, // Hide x-axis grid
        ticks: { color: "#BFDBFE" }, // Light blue labels
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.15)" }, // Subtle grid lines
        ticks: { color: "#BFDBFE" },
      },
    },
  };

  return (
    <Paper
      sx={{
        p: 2,
        height: "100%",
        background: "rgba(30, 41, 59, 0.9)", // Slightly more opaque dark background
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)", // Softer shadow
        borderRadius: 3,
        border: "1px solid rgba(255, 255, 255, 0.15)",
        color: "#F8FAFC",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.3)", // Hover effect
        },
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: "#60A5FA" }}>
        📊 Attendance
      </Typography>
      <div style={{ height: "200px" }}>
        <Bar data={data} options={options} />
      </div>
    </Paper>
  );
};

export default AttendanceChart;
