import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// ✅ Register required elements
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AttendanceChart = () => {
  const [attendanceData, setAttendanceData] = useState([0, 0, 0, 0, 0, 0, 0]); // Default empty data

  useEffect(() => {
    // Fetch attendance data
    axios.get("http://localhost:5000/api/dashboard/attendance")
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
        backgroundColor: "#3B82F6",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Prevents stretching
  };

  return <div style={{ height: "200px" }}><Bar data={data} options={options} /></div>;
};

export default AttendanceChart;
