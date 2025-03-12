import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/attendance")
      .then(response => {
        setAttendanceData(response.data); // Expecting { attendance: [numbers] }
      })
      .catch(error => console.error("Error fetching attendance data:", error));
  }, []);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Attendance",
        data: attendanceData.length > 0 ? attendanceData : [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div style={{ height: "200px", width: "100%" }}>
      <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default Chart;
