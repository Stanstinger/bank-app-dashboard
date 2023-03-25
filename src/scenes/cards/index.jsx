import React from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import CreditCard from "../../components/CreditCard";

const Cards = ({ account }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="1.5rem">
      <Box>
        <Header
          title="Cards"
          subtitle="All cards linked to your bank account are displayed here."
        />
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="6rem"
        gap="3rem"
      >
        <CreditCard account={account} />
      </Box>
    </Box>
  );
};

export default Cards;
