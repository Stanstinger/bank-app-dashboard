import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 1rem">
      <Box display="flex" justifyContent="space-between" gap="2rem">
        <Box display="flex" gap="0.5rem">
          {icon}
          <Typography variant="h6" sx={{ color: colors.grey[700] }}>
            {subtitle}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" gap="2rem">
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: colors.greenAccent[400] }}
        >
          {title}
        </Typography>

        <Typography
          variant="h6"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
