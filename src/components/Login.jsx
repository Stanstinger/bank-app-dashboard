import React, { useState } from "react";
import {
  CssBaseline,
  ThemeProvider,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Layout from "./scenes/layout";
import Logo from "./data/logo.png";
import "./app.css";
import { mockAccounts } from "./data/dummy";

const App = () => {
  const [theme, colorMode] = useMode();
  const [userName, setUserName] = useState("");
  const handleChange = (event) => {
    setUserName(event.target.value);
    console.log("value is:", event.target.value);
  };

  const [userPin, setUserPin] = useState("");
  const handleChangePin = (event) => {
    setUserPin(event.target.value);
    console.log("value is:", event.target.value);
  };

  const [dashboardOpacity, setDashboardOpacity] = useState(0);

  const handleLogIn = (event) => {
    event.preventDefault();

    const currentAccount = mockAccounts.find((acc) => acc.name === userName);

    if (currentAccount?.pin === Number(userPin)) {
      setDashboardOpacity(1);
    } else {
      setUserName("");
      setUserPin("");
    }
  };

  return (
    <div className="app">
      <div className="nav-login">
        <p className="welcome">Log in to get started</p>
        <img src={Logo} alt="Logo" className="logo" />
        <form className="login">
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
            onClick={handleLogIn}
          >
            &rarr;
          </Button>
        </form>
      </div>

      <div className="dashboard" style={{ opacity: dashboardOpacity }}>
        <BrowserRouter>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes>
                <Route element={<Layout />}>
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                  />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
              </Routes>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
