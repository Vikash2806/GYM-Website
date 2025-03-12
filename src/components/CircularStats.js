import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const CircularStats = () => {
  const [stats, setStats] = useState({
    scheduled: 0,
    paid: 0,
    overdue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const responses = await Promise.all([
          axios.get("http://localhost:5000/api/circular-stats/scheduled"),
          axios.get("http://localhost:5000/api/circular-stats/paid"),
          axios.get("http://localhost:5000/api/circular-stats/overdue"),
        ]);

        setStats({
          scheduled: responses[0].data.value,
          paid: responses[1].data.value,
          overdue: responses[2].data.value,
        });
      } catch (error) {
        console.error("Error fetching circular stats:", error);
      }
    };

    fetchStats();
  }, []);

  const chartData = (value, color) => ({
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: [color, "#e0e0e0"],
        borderWidth: 3,
        borderRadius: 10,
        spacing: 0,
        hoverOffset: 0,
      },
    ],
  });

  return (
    <Grid container spacing={3}>
      {[
        { label: "Scheduled", value: stats.scheduled, color: "#3B82F6" },
        { label: "Paid", value: stats.paid, color: "#06B6D4" },
        { label: "Overdue", value: stats.overdue, color: "#8B5CF6" },
      ].map((stat, index) => (
        <Grid item key={index}>
          <Box sx={{ textAlign: "center", width: 120 }}>
            <Doughnut data={chartData(stat.value, stat.color)} options={{ cutout: "70%" }} />
            <Typography variant="h6" sx={{ color: "#BFDBFE" }}>
              {stat.label}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#BFDBFE" }}>
              ${stat.value.toFixed(2)}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default CircularStats;
