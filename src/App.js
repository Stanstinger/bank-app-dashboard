import React, { useState } from "react";
import { CssBaseline, ThemeProvider, TextField, Button } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Layout from "./scenes/layout";
import Analytics from "./scenes/analytics";
import Payment from "./scenes/payment";
import Cards from "./scenes/cards";
import Transactions from "./scenes/transactions";
import Settings from "./scenes/settings";
import ManageCards from "./scenes/manage cards";
import Contact from "./scenes/contact us";
import Logo from "./data/logo.png";
import "./app.css";
import { mockAccounts } from "./data/dummy";

const App = () => {
  const [theme, colorMode] = useMode();
  const [userName, setUserName] = useState("");
  const [userPin, setUserPin] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleChange = (event) => {
    setUserName(event.target.value);
  };

  const handleChangePin = (event) => {
    setUserPin(event.target.value);
  };

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const account = mockAccounts.find((acc) => acc.name === userName);

    if (account?.pin === Number(userPin)) {
      setCurrentAccount(account);
      setLoggedIn(true);
      setLoginError(false);
      setUserName("");
      setUserPin("");
    } else {
      setLoginError(true);
      setUserName("");
      setUserPin("");
    }
  };

  return (
    <div className="app">
      {!loggedIn && (
        <div className="nav-login">
          <p className="welcome">Log in to get started</p>
          <img src={Logo} alt="Logo" className="logo" />
          <form className="login" onSubmit={handleSubmit}>
            <TextField
              id="userName"
              label="Username"
              variant="outlined"
              value={userName}
              onChange={handleChange}
              className="login__input login__input--user"
            />
            <TextField
              type="password"
              id="userPin"
              label="PIN"
              value={userPin}
              onChange={handleChangePin}
              variant="outlined"
              inputProps={{ maxLength: 4 }}
              className="login__input login__input--pin"
            />
            <Button
              variant="contained"
              color="primary"
              className="login__btn"
              type="submit"
            >
              &rarr;
            </Button>

            {loginError && (
              <p className="login__error">Incorrect username or PIN.</p>
            )}
          </form>
        </div>
      )}
      {loggedIn && (
        <div className="dashboard" style={{ opacity: "1" }}>
          <BrowserRouter>
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes>
                  <Route
                    element={
                      <Layout
                        account={currentAccount}
                        setLoggedIn={setLoggedIn}
                      />
                    }
                  >
                    <Route
                      path="/"
                      element={<Navigate to="/dashboard" replace />}
                    />
                    <Route
                      path="/dashboard"
                      element={<Dashboard account={currentAccount} />}
                    />

                    <Route
                      path="/analytics"
                      element={<Analytics account={currentAccount} />}
                    />

                    <Route
                      path="/transactions"
                      element={<Transactions account={currentAccount} />}
                    />

                    <Route
                      path="/cards"
                      element={<Cards account={currentAccount} />}
                    />

                    <Route
                      path="/payment"
                      element={<Payment account={currentAccount} />}
                    />

                    <Route
                      path="/settings"
                      element={<Settings account={currentAccount} />}
                    />

                    <Route
                      path="/manage cards"
                      element={<ManageCards account={currentAccount} />}
                    />

                    <Route
                      path="/contact us"
                      element={<Contact account={currentAccount} />}
                    />
                  </Route>
                </Routes>
              </ThemeProvider>
            </ColorModeContext.Provider>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
};

export default App;
