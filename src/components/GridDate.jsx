import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const GridDate = ({ format }) => {
  const date = new Date(format);
  const hour = `${date.getHours()}`.padStart(2, 0);
  const min = `${date.getMinutes()}`.padStart(2, 0);
  const month = date.toLocaleString("default", { month: "short" });
  const day = `${date.getDate()}`.padStart(2, 0);
  const year = date.getFullYear();

  const theme = useTheme();
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.only("sm"));

  return (
    <Box>
      <Typography
        fontSize={
          isExtraSmallScreen ? "0.55rem" : isSmallScreen ? "0.75rem" : "0.75rem"
        }
      >
        {month} {day}, {year}
      </Typography>
      <Typography
        fontSize={
          isExtraSmallScreen ? "0.55rem" : isSmallScreen ? "0.75rem" : "0.75rem"
        }
      >
        {hour}:{min}
      </Typography>
    </Box>
  );
};

export default GridDate;
