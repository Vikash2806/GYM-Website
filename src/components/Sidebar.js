import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import StoreIcon from "@mui/icons-material/Store";

const Sidebar = () => {
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Members", icon: <PeopleIcon /> },
    { text: "Billing", icon: <PaymentIcon /> },
    { text: "Sales", icon: <StoreIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          color: "#1E3A8A",
          background: "linear-gradient(120deg,rgb(0, 110, 243), #E0F2FE, #BFDBFE)",
          backgroundSize: "600% 600%",
          animation: "waveFlow 2.5s ease-in-out infinite",
          "@keyframes waveFlow": {
            "0%": {
              backgroundPosition: "0% 50%",
            },
            "50%": {
              backgroundPosition: "100% 50%",
            },
            "100%": {
              backgroundPosition: "0% 50%",
            },
          },
        },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(3, 128, 254, 0.3)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#1E3A8A" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
