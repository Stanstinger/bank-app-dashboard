import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";
import FormatDate from "./FormatDate";
import FormatCurrency from "./FormatCurrency";

const DisplayTransactions = ({ account }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      {account.transactions.map((transaction, i) => {
        const type = transaction.amount > 0 ? "deposit" : "withdraw";

        const date = new Date(transaction.date);

        return (
          <Box
            key={`${transaction.txId}-${i}`}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography color={colors.grey[800]}>
                {transaction.user}
              </Typography>
            </Box>
            <Box>
              <Typography
                color={colors.grey[500]}
                // variant="h5"
                // fontWeight="600"
              >
                {transaction.txId}
              </Typography>
            </Box>
            <Box color={colors.grey[700]}>
              <FormatDate date={date} locale={account.locale} />
            </Box>

            <Box
              color={
                type === "deposit"
                  ? colors.greenAccent[400]
                  : colors.redAccent[500]
              }
              p="0.25rem 0.5rem"
              borderRadius="0.25rem"
            >
              {type === "deposit" ? "+" : ""}
              <FormatCurrency
                amount={Number(transaction.amount).toFixed(2)}
                locale={account.locale}
                currency={account.currency}
              />
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default DisplayTransactions;
