import React, { useState } from "react";

import {
  Button,
  Box,
  Typography,
  IconButton,
  useTheme,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import { mockAccounts } from "../../data/dummy";
import {
  DownloadOutlined,
  AddOutlined,
  AccountBalanceOutlined,
} from "@mui/icons-material";
import LineChart from "../../components/LineChart";
import FlexBetween from "../../components/FlexBetween";
import cardImage from "../../data/black-credit-card.jpg";
import DisplayTransactions from "../../components/DisplayTransactions";
import DisplaySummary from "../../components/DisplaySummary";
import FormatCurrency from "../../components/FormatCurrency";
import StatBox from "../../components/StatBox";
import { useEffect } from "react";

const Dashboard = ({ account }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [globalDate, setGlobalDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    // const locale = navigator.language;
    const formattedDate = new Intl.DateTimeFormat(
      account.locale,
      options
    ).format(now);
    setGlobalDate(formattedDate);
  }, []);

  account.balance = account.transactions.reduce((acc, curr) => {
    const amt = parseFloat(curr.amount);
    return acc + amt;
  }, 0);

  const [recipientEmail, setRecipientEmail] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  const handleChange = (event) => {
    setRecipientEmail(event.target.value);
  };

  const handleChangeAmount = (event) => {
    setTransferAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const amount = Number(transferAmount);
    const receiverAccount = mockAccounts.find(
      (acc) => acc.email === recipientEmail
    );

    if (
      amount > 0 &&
      receiverAccount &&
      account.balance >= amount &&
      receiverAccount?.email !== account.email
    ) {
      account.transactions.unshift({
        txId: Date.now(),
        user: receiverAccount.name.split(" ")[0],
        date: new Date().toISOString(),
        amount: -amount,
        status: "Completed",
        email: receiverAccount.email,
      });

      receiverAccount.transactions.unshift({
        txId: Date.now(),
        user: account.name.split(" ")[0],
        date: new Date().toISOString(),
        amount: amount,
        status: "Completed",
        email: account.email,
      });
    }

    setRecipientEmail("");
    setTransferAmount("");
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box mb="30px">
          <Typography
            variant="h5"
            color={colors.grey[900]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            Welcome back, {account.name.split(" ")[0]}
          </Typography>
          <Typography variant="h6" color={colors.grey[700]}>
            Start managing your finances.
          </Typography>
        </Box>

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "0.75rem",
              fontWeight: "bold",
              padding: "0.5rem 1rem",
            }}
          >
            <DownloadOutlined sx={{ mr: "0.5rem" }} />
            Download Reports
          </Button>
        </Box>
      </Box>
      {/* GRID */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="6rem"
        gap="1rem"
      >
        {/* Row 1 */}

        <Box
          gridColumn="span 8"
          display="flex"
          // backgroundColor={colors.primary[600]}
          justifyContent="space-between"
          gap="2rem"
        >
          <Box mb="30px">
            <Typography
              variant="h5"
              color={colors.grey[900]}
              fontWeight="bold"
              sx={{ mb: "5px" }}
            >
              Current balance
            </Typography>
            <Typography variant="h6" color={colors.grey[700]}>
              As of {globalDate}
            </Typography>
          </Box>
          <Box
            backgroundColor={colors.grey[200]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="0.5rem"
          >
            <StatBox
              icon={<AccountBalanceOutlined />}
              title={
                <FormatCurrency
                  amount={account.balance.toFixed(2)}
                  locale={account.locale}
                  currency={account.currency}
                />
              }
              subtitle="My Balance"
              increase="+14%"
            />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 8"
          display="flex"
          flexDirection="column"
          backgroundColor={colors.primary[800]}
          gap="1.5rem"
          p="1rem"
          borderRadius="1rem"
        >
          <FlexBetween>
            <Box ml="0.5rem">
              <Typography color={colors.grey[100]} variant="h5">
                My card
              </Typography>
            </Box>
            <Box>
              <Button
                sx={{
                  color: colors.grey[100],
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  padding: "0.5rem 1rem",
                }}
              >
                <AddOutlined sx={{ mr: "0.5rem" }} />
                Add Card
              </Button>
            </Box>
          </FlexBetween>

          <Box
            component="img"
            alt="profile"
            src={cardImage}
            height="225px"
            width="100%"
            borderRadius="1rem"

            // sx={{ objectFit: "cover" }}
          />

          <Box>
            <Typography variant="h6" fontWeight="400" color={colors.grey[100]}>
              Card Holder
            </Typography>
            <Typography variant="h5" fontWeight="600" color={colors.grey[800]}>
              {account.name}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" fontWeight="400" color={colors.grey[100]}>
              Card Number
            </Typography>
            <Typography variant="h5" fontWeight="600" color={colors.grey[800]}>
              4756 3232 9988 9018
            </Typography>
          </Box>

          <FlexBetween>
            <Box>
              <Typography variant="h6" color={colors.grey[800]}>
                Status
              </Typography>
              <Typography variant="h5" color={colors.grey[100]}>
                Active
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" color={colors.grey[800]}>
                Expire date
              </Typography>
              <Typography variant="h5" color={colors.grey[100]}>
                04/25
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" color={colors.grey[800]}>
                Category
              </Typography>
              <Typography variant="h5" color={colors.grey[100]}>
                Platinium
              </Typography>
            </Box>
          </FlexBetween>

          <Box>
            <Typography variant="h5" color={colors.grey[100]}>
              Quick Transaction
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <TextField
                id="recipientEmail"
                label="Recipient Email"
                variant="outlined"
                value={recipientEmail}
                onChange={handleChange}
                placeholder="jondoe@gmail.com"
              />
              <TextField
                type="number"
                id="transferAmount"
                label="Amount"
                value={transferAmount}
                onChange={handleChangeAmount}
                variant="outlined"
              />
              <Button variant="contained" color="primary" type="submit">
                Send Money
              </Button>
            </Box>
          </Box>
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="1.5rem"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Income stats
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342,32
              </Typography>
            </Box>

            <Box>
              <IconButton>
                <DownloadOutlined
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>

          <Box height="250px" mt="-1.25rem">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* TRANSACTIONS */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.grey[100]}
          overflow="auto"
          borderRadius="1rem"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`2px solid ${colors.grey[200]}`}
            color={colors.grey[700]}
            p="15px"
          >
            <Typography color={colors.grey[700]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>

          <DisplayTransactions account={account} />
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 1"
          backgroundColor={colors.primary[500]}
          display="flex"
          justifyContent="space-between"
          p="1rem"
          pr="2.5rem"
        >
          <DisplaySummary account={account} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
