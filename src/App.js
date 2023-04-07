import React, { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
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
import Image1 from "./data/online-banking.png";
import Image2 from "./data/revenue.png";
import Image3 from "./data/success.png";
import { Email, Person, Lock } from "@mui/icons-material";

const App = () => {
  const [theme, colorMode] = useMode();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleFocus = (event) => {
    event.target.classList.add("active");
    event.target.previousSibling.classList.add("active");
  };

  const handleBlur = (event) => {
    if (event.target.value === "") {
      event.target.classList.remove("active");
      event.target.previousSibling.classList.remove("active");
    }
  };

  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleToggle = () => {
    setIsSignUpMode((prevState) => !prevState);
  };

  const [curSlide, setCurSlide] = useState(0);
  const slides = [
    { image: Image1, header: "Fast Money Transfers" },
    { image: Image2, header: "Financial Analysis" },
    { image: Image3, header: "All Your Banking Needs in One" },
  ];
  const maxSlide = slides.length;

  const handlePrev = () => {
    if (curSlide === 0) {
      setCurSlide(maxSlide - 1);
    } else {
      setCurSlide(curSlide - 1);
    }
  };

  const handleNext = () => {
    if (curSlide === maxSlide - 1) {
      setCurSlide(0);
    } else {
      setCurSlide(curSlide + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [curSlide, maxSlide]);

  function handleDotClick(e) {
    const slideIndex = Number(e.target.dataset.slide);
    setCurSlide(slideIndex);
  }

  const handleChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setUserPassword(event.target.value);
  };

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const account = mockAccounts.find((acc) => acc.email === userEmail);

    if (account?.password === Number(userPassword)) {
      setCurrentAccount(account);
      setLoggedIn(true);
      setLoginError(false);
      setUserEmail("");
      setUserPassword("");
    } else {
      setLoginError(true);
      setUserEmail("");
      setUserPassword("");
    }
  };

  return (
    <div className="app">
      {!loggedIn && (
        <div
          className={`login-container ${isSignUpMode ? "sign-up-mode" : ""}`}
        >
          <div className="box">
            <div className="inner-box">
              <div className="forms-wrap">
                <form className="sign-in-form" onSubmit={handleSubmit}>
                  <div className="logo">
                    <img src={Logo} alt="Logo" className="logo" />
                    <h4>BANKEASE</h4>
                  </div>

                  <div className="heading">
                    <h2>Welcome Back</h2>
                    <h6>Not Registered?</h6>
                    <a href="#" className="toggle" onClick={handleToggle}>
                      Sign Up
                    </a>
                  </div>

                  <div className="actual-form">
                    <div className="input-wrap">
                      <Email className="input-icon" />
                      <input
                        id="userEmail"
                        type="text"
                        minlength="4"
                        value={userEmail}
                        onChange={handleChange}
                        className="input-field"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                      />
                      <label>Email</label>
                    </div>
                    <div className="input-wrap">
                      <Lock className="input-icon" />
                      <input
                        id="userPassword"
                        type="password"
                        minlength="4"
                        value={userPassword}
                        onChange={handleChangePassword}
                        className="input-field"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                      />
                      <label>Password</label>
                    </div>
                    <input type="submit" value="LOG IN" className="sign-btn" />
                    <p className="text">
                      Forgot Password? <br />
                      <a href="#">Get Help</a> Signing In{" "}
                    </p>
                  </div>

                  {loginError && (
                    <p className="login__error">
                      Incorrect username or password.
                    </p>
                  )}
                </form>

                <div className="mock-accounts">
                  <p>Pre-populated accounts for Testing Purposes</p>
                  <div className="logins">
                    <span>Email: jonsnow@gmail.com</span>
                    <span>Pass: 1111</span>
                  </div>
                  <div className="logins">
                    <span>Email: cerseilannister@gmail.com</span>
                    <span>Pass: 1112</span>
                  </div>
                  <div className="logins">
                    <span>Email: jaimelannister@gmail.com</span>
                    <span>Pass: 1113</span>
                  </div>
                </div>

                <form autoComplete="off" className="sign-up-form">
                  <div className="logo">
                    <img src={Logo} alt="Logo" className="logo" />
                    <h4>BANKEASE</h4>
                  </div>

                  <div className="heading">
                    <h2>Get Started</h2>
                    <h6>Already Have An Account?</h6>
                    <a href="#" className="toggle" onClick={handleToggle}>
                      Sign In
                    </a>
                  </div>
                  <div className="actual-form">
                    <div className="input-wrap">
                      <Person className="input-icon" />
                      <input
                        type="text"
                        minlength="4"
                        className="input-field"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                      />
                      <label>User Name</label>
                    </div>
                    <div className="input-wrap">
                      <Email className="input-icon" />
                      <input
                        type="email"
                        className="input-field"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                      />
                      <label>Email</label>
                    </div>
                    <div className="input-wrap">
                      <Lock className="input-icon" />
                      <input
                        type="password"
                        minlength="4"
                        className="input-field"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                      />
                      <label>Password</label>
                    </div>

                    <input type="submit" value="Sign Up" className="sign-btn" />
                    <p className="text">
                      By Signing Up, I agree to the
                      <a href="#">Terms and Conditions</a> and
                      <a href="#">Privacy and Policy</a>
                    </p>
                  </div>
                </form>
              </div>

              <div className="carousel">
                <div className="slides-wrapper">
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className={`slide slide-${index + 1} ${
                        curSlide === index ? "active" : ""
                      }`}
                      style={{
                        transform: `translateX(${100 * (index - curSlide)}%)`,
                      }}
                    >
                      <div className="slide-image">
                        <img src={slide.image} alt={`slide ${index + 1}`} />
                      </div>
                      <div className="slide-header">
                        <h2>{slide.header}</h2>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="slider__btn slider__btn--left"
                  onClick={handlePrev}
                >
                  &larr;
                </button>
                <button
                  className="slider__btn slider__btn--right"
                  onClick={handleNext}
                >
                  &rarr;
                </button>
                <div className="dots">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      className={`dots__dot${
                        i === curSlide ? " dot-active" : ""
                      }`}
                      data-slide={i}
                      onClick={handleDotClick}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
