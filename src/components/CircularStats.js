import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Typography } from "@mui/material";
import axios from "axios";

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const CircularStats = ({ label, color, apiUrl }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setValue(response.data.value); // Expecting { value: number }
      })
      .catch(error => console.error("Error fetching circular stats:", error));
  }, [apiUrl]);

  const data = {
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
  };

  return (
    <Box sx={{ textAlign: "center", width: 120 }}>
      <Doughnut data={data} options={{ cutout: "70%" }} />
      <Typography variant="h6" sx={{ color: "#BFDBFE" }}>{label}</Typography>
      <Typography variant="subtitle1" sx={{ color: "#BFDBFE" }}>${value.toFixed(2)}</Typography>
    </Box>
  );
};

export default CircularStats;
