import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "../../components/Header";
import "./index.css";
import { mockAccounts } from "../../data/dummy";

const Payment = ({ account }) => {
  const [formValues, setFormValues] = useState({
    fromAccount: "",
    toRecentAccount: "",
    amount: "",
    currency: "",
    toNewAccount: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  account.balance = account.transactions.reduce((acc, curr) => {
    const amt = parseFloat(curr.amount);
    return acc + amt;
  }, 0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const amount = Number(formValues.amount);
    const receiverAccount = mockAccounts.find(
      (acc) => acc.accountNumber === formValues.toNewAccount
    );

    if (
      amount > 0 &&
      receiverAccount &&
      account.balance >= amount &&
      receiverAccount?.accountNumber !== account.accountNumber
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

    setFormValues("");
  };
  return (
    <div className="payment-container">
      <div className="payment-header">
        <Header
          title="Payments"
          subtitle="Transfer money to friends and family and make payments."
        />
      </div>
      <div className="payment__form-container">
        <form onSubmit={handleSubmit} className="transfer-form">
          <div className="account-fields">
            <FormControl sx={{ minWidth: "200px" }}>
              <InputLabel>From Account</InputLabel>
              <Select
                name="fromAccount"
                value={formValues.fromAccount}
                onChange={handleInputChange}
              >
                <MenuItem value="checking">Checking</MenuItem>
                <MenuItem value="savings">Savings</MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormControl sx={{ minWidth: "200px" }}>
              <InputLabel>To Recent Account</InputLabel>
              <Select
                name="toRecentAccount"
                value={formValues.toRecentAccount}
                onChange={handleInputChange}
              >
                <MenuItem value="123456789">123456789</MenuItem>
                <MenuItem value="987654321">987654321</MenuItem>
              </Select>
            </FormControl>
            <br />
          </div>
          <TextField
            name="toNewAccount"
            label="New Account"
            type="text"
            value={formValues.toNewAccount}
            onChange={handleInputChange}
          />
          <br />
          <br />
          <TextField
            name="amount"
            label="Amount"
            type="number"
            value={formValues.amount}
            onChange={handleInputChange}
          />
          <br />
          <FormControl sx={{ minWidth: "120px" }}>
            <InputLabel>Currency</InputLabel>
            <Select
              name="currency"
              value={formValues.currency}
              onChange={handleInputChange}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
            </Select>
          </FormControl>
          <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: "2rem" }}
          >
            Transfer Money
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
