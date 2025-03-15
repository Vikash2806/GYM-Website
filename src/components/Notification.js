import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

const NotificationBox = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Paper
      sx={{
        p: 2,
        background: "rgba(30, 41, 59, 0.85)", // Semi-transparent dark, NO blur on hover
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)", // Soft shadow
        borderRadius: 3,
        border: "1px solid rgba(255, 255, 255, 0.15)",
        color: "#F8FAFC",
        maxHeight: 250,
        overflowY: "auto",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)", // Hover effect without blur
        },
        scrollbarWidth: "none", // Hide scrollbar (Firefox)
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar (Chrome, Safari)
        },
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: "#60A5FA" }}>
        🔔 Notifications
      </Typography>
      <List sx={{ p: 0 }}>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <ListItem
              key={index}
              sx={{
                p: 1.5,
                borderRadius: 2,
                background: "rgba(255, 255, 255, 0.1)",
                mb: 1,
                "&:hover": { background: "rgba(255, 255, 255, 0.2)" },
              }}
            >
              <ListItemText
                primary={notification.message}
                primaryTypographyProps={{
                  sx: { fontSize: "14px", color: "#E2E8F0", fontWeight: 500 },
                }}
                secondary={new Date(notification.date).toLocaleString("en-US")}
                secondaryTypographyProps={{
                  sx: { fontSize: "12px", color: "#9CA3AF", fontStyle: "italic" },
                }}
              />
            </ListItem>
          ))
        ) : (
          <Typography
            variant="body2"
            sx={{
              color: "#9CA3AF",
              textAlign: "center",
              p: 2,
              fontStyle: "italic",
              opacity: 0.8,
            }}
          >
            No new notifications
          </Typography>
        )}
      </List>
    </Paper>
  );
};

export default NotificationBox;
