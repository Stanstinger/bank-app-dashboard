import React, { useState } from "react";

import { Button, Box, useTheme, TextField } from "@mui/material";
import { tokens } from "../../theme";
import { mockAccounts } from "../../data/dummy";
import { AddOutlined, AccountBalanceOutlined } from "@mui/icons-material";

import chip from "../../data/chip.png";
import visa from "../../data/visa.png";
import mapImage from "../../data/map.png";

import DisplayTransactions from "../../components/DisplayTransactions";
import DisplaySummary from "../../components/DisplaySummary";
import FormatCurrency from "../../components/FormatCurrency";
import ProgressCircle from "../../components/ProgressCircle";
import { useEffect } from "react";
import womanImage from "../../data/woman.jpg";
import "./index.css";

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
    const locale = account.locale;
    // const locale = navigator.language;
    const formattedDate = new Intl.DateTimeFormat(locale, options).format(now);
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
    <div className="dashboard-container">
      {/* Row 1 */}
      <div className="welcome-content">
        <span className="welcome-title">
          Welcome back, {account.name.split(" ")[0]}
        </span>
        <span className="welcome__sub-title">
          Start managing your finances.
        </span>
      </div>
      {/* Row 2 */}
      <div className="balance-content">
        <div className="titles">
          <span className="balance-title">Current balance</span>
          <span className="balance__sub-title">As of {globalDate}</span>
        </div>
        <div className="balance-box">
          <div className="balance-space">
            <div className="balance-text">
              <AccountBalanceOutlined sx={{ color: colors.grey[500] }} />
              <span>My Balance</span>
            </div>
            <div className="balance-figure">
              <span>
                <FormatCurrency
                  amount={account.balance.toFixed(2)}
                  locale={account.locale}
                  currency={account.currency}
                />
              </span>
            </div>
          </div>
          <div className="balance-progress">
            <div>
              <ProgressCircle progress={0.75} />
            </div>
            <div className="percentage">
              <span>14%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3 */}
      <div className="advert-container">
        <div className="advert-text">
          <span className="advert-title">GBank</span>

          <span className="advert__sub-title">Crazy Cashback</span>
          <p>New cashback system to return up to 15% of cashback</p>
        </div>

        <div className="advert-img">
          <img src={womanImage} alt="profile" />
        </div>
      </div>

      {/* ROW 4 */}

      <div className="credit__card-container">
        <div className="card-medium">
          <div className="card__container-heading">
            <span>My card</span>

            <Button
              sx={{
                color: colors.grey[500],
                fontSize: "0.85rem",
                fontWeight: "bold",
                padding: "0.5rem 1rem",
              }}
            >
              <AddOutlined sx={{ mr: "0.5rem" }} />
              Add Card
            </Button>
          </div>

          <div className="card__img-container">
            <div className="card-front">
              <div className="map">
                <img src={mapImage} alt="map" />
              </div>

              <div className="card-images">
                <div className="chip">
                  <img src={chip} alt="chip" />
                </div>

                <div className="visa">
                  <img src={visa} alt="visa" />
                </div>
              </div>
              <div className="dash__card-number">
                <span>{account.cards[0].cardNumber.substring(0, 4)}</span>
                <span>{account.cards[0].cardNumber.substring(4, 8)}</span>
                <span>{account.cards[0].cardNumber.substring(8, 12)}</span>
                <span>{account.cards[0].cardNumber.substring(12, 16)}</span>
              </div>
              <div className="dashcard__info-title">
                <span>CARD HOLDER</span>
                <span>VALID TILL</span>
              </div>
              <div className="card-info">
                <span>{account.name.toUpperCase()}</span>
                <span>
                  {account.cards[0].expiryMonth}/
                  {account.cards[0].expiryYear.substring(2, 4)}
                </span>
              </div>
            </div>
          </div>
          <div className="card-description">
            <div className="flex-column">
              <span className="card__description-title">Card Holder</span>
              <span className="card-description-sub">{account.name}</span>
            </div>

            <div className="flex-column">
              <span className="card__description-title">Card Number</span>
              <span className="card-description-sub">
                {account.cards[0].cardNumber}
              </span>
            </div>

            <div className="card-status">
              <div className="flex-column">
                <span className="card__status-title">Status</span>
                <span className="card__status-sub">Active</span>
              </div>
              <div className="flex-column">
                <span className="card__status-title">Expire date</span>
                <span className="card__status-sub">04/25</span>
              </div>
              <div className="flex-column">
                <span className="card__status-title">Category</span>
                <span className="card__status-sub">Platinium</span>
              </div>
            </div>
          </div>
        </div>
        {/* ROW 5 */}
        <div className="quick-transfer">
          <span>Quick Transaction</span>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            marginTop="1rem"
            bgcolor={colors.primary[500]}
            p="1rem"
            borderRadius="1rem"
          >
            <TextField
              id="recipientEmail"
              label="Recipient Email"
              variant="outlined"
              value={recipientEmail}
              onChange={handleChange}
              placeholder="jondoe@gmail.com"
              InputLabelProps={{
                style: {
                  color: "black",
                  fontSize: "1rem",
                  backgroundColor: colors.grey[100],
                },
              }}
              InputProps={{
                style: {
                  color: "black",
                  fontSize: "1rem",
                  backgroundColor: colors.grey[100],
                },
              }}
            />
            <TextField
              type="number"
              id="transferAmount"
              label="Amount"
              value={transferAmount}
              onChange={handleChangeAmount}
              variant="outlined"
              InputLabelProps={{
                style: {
                  color: "black",
                  fontSize: "1rem",
                  backgroundColor: colors.grey[100],
                },
              }}
              InputProps={{
                style: {
                  color: "black",
                  fontSize: "1rem",
                  backgroundColor: colors.grey[100],
                },
              }}
            />
            <Button variant="contained" color="primary" type="submit">
              Send Money
            </Button>
          </Box>
        </div>
      </div>

      {/* TRANSACTIONS */}
      <div className="transactions-container">
        <div className="container-title">
          <span>Recent Transactions</span>
        </div>

        <DisplayTransactions account={account} />
      </div>

      <div className="summary-container">
        <DisplaySummary account={account} />
      </div>
    </div>
  );
};

export default Dashboard;
