import React from "react";
import { Box, Typography } from "@mui/material";

const BottomBar = () => {
  return (
    <Box
      sx={{
        background: "#1E293B",
        color: "#BFDBFE",
        textAlign: "center",
        py: 2,
        boxShadow: "0px -2px 5px rgba(0,0,0,0.2)",
        mt: 4, // margin-top to separate from content
      }}
    >
      <Typography variant="body2">
      💙💙💙💙💙💙💙💙💙💙💙💙 © {new Date().getFullYear()} Your Company. All rights reserved.💙💙💙💙💙💙💙💙💙💙💙💙💙💙
      </Typography>
    </Box>
  );
};

export default BottomBar;
