import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import axios from "axios";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";

const statusColors = {
  Scheduled: "primary",
  "In Progress": "warning",
  Upcoming: "success",
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/bookings");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <Paper
      sx={{
        p: 3,
        background: "rgba(30, 41, 59, 0.88)", // ✅ slightly transparent background
        boxShadow: 4,
        borderRadius: 3,
        color: "#fff",
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: "#93C5FD", fontWeight: "bold" }}>
        📅 My Bookings
      </Typography>

      <List>
        {bookings.map((booking, index) => (
          <Box key={index}>
            <ListItem
              alignItems="flex-start"
              sx={{
                py: 1.5,
                "&:hover": {
                  backgroundColor: "#334155",
                  borderRadius: 2,
                  transition: "0.2s",
                },
              }}
            >
              <ListItemText
                primary={
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight="bold" fontSize="1rem">
                      {booking.title}
                    </Typography>
                    <Chip
                      label={booking.status}
                      size="small"
                      color={statusColors[booking.status] || "default"}
                      sx={{ fontWeight: 500 }}
                    />
                  </Stack>
                }
                secondary={
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <EventIcon sx={{ fontSize: 18, color: "#60A5FA" }} />
                      <Typography variant="body2" color="#CBD5E1">
                        {booking.time}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <PersonIcon sx={{ fontSize: 18, color: "#A78BFA" }} />
                      <Typography variant="body2" color="#E0E7FF">
                        {booking.instructor} · {booking.attendees} 👥
                      </Typography>
                    </Box>
                  </Stack>
                }
              />
            </ListItem>
            {index < bookings.length - 1 && <Divider sx={{ borderColor: "#334155", my: 1 }} />}
          </Box>
        ))}
      </List>
    </Paper>
  );
};

export default Bookings;
