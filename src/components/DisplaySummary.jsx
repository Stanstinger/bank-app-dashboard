import React from "react";
import { tokens } from "../theme";
import { Box, useTheme, Typography, useMediaQuery } from "@mui/material";
import FormatCurrency from "./FormatCurrency";

const DisplaySummary = ({ account }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.only("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.only("md"));

  const incomeSummary = account.transactions
    .filter((transaction) => parseFloat(transaction.amount) > 0)
    .reduce((acc, curr) => {
      return acc + parseFloat(curr.amount);
    }, 0);

  const outcomeSummary = account.transactions
    .filter((transaction) => parseFloat(transaction.amount) < 0)
    .reduce((acc, curr) => {
      return acc + parseFloat(curr.amount);
    }, 0);

  const interest = account.transactions
    .filter((transaction) => parseFloat(transaction.amount) > 0)
    .map((transaction) => parseFloat(transaction.amount) * (1.2 / 100))
    .filter((int) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  return (
    <>
      <Box display="flex" gap="0.5rem" alignItems="center">
        <Typography
          color={colors.grey[700]}
          variant={
            isExtraSmallScreen ? "typography" : isSmallScreen ? "h6" : "h6"
          }
          fontWeight="400"
        >
          IN
        </Typography>
        <Typography
          color={colors.greenAccent[400]}
          variant={isExtraSmallScreen ? "h6" : isSmallScreen ? "h5" : "h4"}
          fontWeight="400"
        >
          <FormatCurrency
            amount={incomeSummary.toFixed(2)}
            locale={account.locale}
            currency={account.currency}
          />
        </Typography>
      </Box>

      <Box display="flex" gap="0.5rem" alignItems="center">
        <Typography
          color={colors.grey[700]}
          variant={
            isExtraSmallScreen ? "typography" : isSmallScreen ? "h6" : "h6"
          }
          fontWeight="400"
        >
          OUT
        </Typography>
        <Typography
          color={colors.redAccent[500]}
          variant={isExtraSmallScreen ? "h6" : isSmallScreen ? "h5" : "h4"}
          fontWeight="400"
        >
          <FormatCurrency
            amount={Math.abs(outcomeSummary.toFixed(2))}
            locale={account.locale}
            currency={account.currency}
          />
        </Typography>
      </Box>

      <Box display="flex" gap="0.5rem" alignItems="center">
        <Typography
          color={colors.grey[700]}
          variant={
            isExtraSmallScreen ? "typography" : isSmallScreen ? "h6" : "h6"
          }
          fontWeight="400"
        >
          INTEREST
        </Typography>
        <Typography
          color={colors.greenAccent[400]}
          variant={isExtraSmallScreen ? "h6" : isSmallScreen ? "h5" : "h4"}
          fontWeight="400"
        >
          <FormatCurrency
            amount={interest.toFixed(2)}
            locale={account.locale}
            currency={account.currency}
          />
        </Typography>
      </Box>
    </>
  );
};

export default DisplaySummary;
