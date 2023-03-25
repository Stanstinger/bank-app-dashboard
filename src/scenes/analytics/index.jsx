import React from "react";
import BarChart from "../../components/BarChart";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

const Analytics = ({ account }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="1.5rem">
      <Box>
        <Header
          title="Analytics"
          subtitle="Track all your finances and analysis in one go."
        />
      </Box>
      {/* GRID */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="6rem"
        gap="1rem"
      >
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          display="flex"
          backgroundColor={colors.primary[600]}
          justifyContent="space-between"
          gap="2rem"
        >
          <BarChart account={account} />
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          display="flex"
          backgroundColor={colors.primary[600]}
          justifyContent="space-between"
          gap="2rem"
          pl="4rem"
        >
          <PieChart transactions={account.transactions} />
        </Box>
      </Box>
    </Box>
  );
};

export default Analytics;
