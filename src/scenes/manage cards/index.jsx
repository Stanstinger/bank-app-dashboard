import React, { useState } from "react";
import chip from "../../data/chip.png";
import creditCard from "../../data/visa.png";
import "./index.css";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const ManageCards = ({ account }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleCardHolderChange = (e) => {
    setCardHolder(e.target.value);
  };

  const handleExpiryMonthChange = (e) => {
    setExpiryMonth(e.target.value);
  };

  const handleExpiryYearChange = (e) => {
    setExpiryYear(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handleCvvMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleCvvMouseLeave = () => {
    setIsFlipped(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCardNumber = cardNumber;
    const newExpiryMonth = expiryMonth;
    const newExpiryYear = expiryYear;
    const newCvv = cvv;

    account.cards.unshift({
      cardNumber: newCardNumber,
      expiryMonth: newExpiryMonth,
      expiryYear: newExpiryYear,
      cvv: newCvv,
    });

    setCardNumber("");
    setCardHolder("");
    setExpiryMonth("");
    setExpiryYear("");
    setCvv("");
  };

  return (
    <Box m="1.5rem">
      <Box>
        <Header
          title="Manage Your Cards"
          subtitle="Add or remove any card from your account easily."
        />
      </Box>
      <Header />
      <div class="container">
        <div className={`card-container ${isFlipped ? "flipped" : ""}`}>
          <div className="front">
            <div className="image">
              <img src={chip} alt="chip" />
              <img src={creditCard} alt="credit card" />
            </div>
            <div className="card-number-box">
              <p>{cardNumber.substring(0, 4) || "####"}</p>
              <p>{cardNumber.substring(4, 8) || "####"}</p>
              <p>{cardNumber.substring(8, 12) || "####"}</p>
              <p>{cardNumber.substring(12, 16) || "####"}</p>
            </div>
            <div className="flexbox">
              <div className="box">
                <span>CARD HOLDER</span>
                <div className="card-holder-name">
                  {cardHolder.toUpperCase() || "FULL NAME"}
                </div>
              </div>
              <div className="box">
                <span>EXPIRES</span>
                <div className="expiration">
                  <span className="exp-month">{expiryMonth || "MM "}</span>
                  <span className="exp-year">{expiryYear || "YY"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="back">
            <div className="stripe"></div>
            <div className="box">
              <span>CVV</span>
              <div className="cvv-box">{cvv}</div>
              <img src={creditCard} alt="" />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <span>CARD NUMBER</span>
              <input
                type="text"
                maxLength="16"
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
            </div>
            <div className="inputBox">
              <span>CARD HOLDER</span>
              <input
                type="text"
                value={cardHolder}
                onChange={handleCardHolderChange}
              />
            </div>
            <div className="flexbox">
              <div className="inputBox">
                <span>EXPIRATION MM</span>
                <select value={expiryMonth} onChange={handleExpiryMonthChange}>
                  <option value="" disabled>
                    Month
                  </option>
                  {[...Array(12).keys()].map((m) => (
                    <option key={m + 1} value={m + 1}>
                      {m + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="inputBox">
                <span>EXPIRATION YY</span>
                <select
                  value={expiryYear}
                  onChange={handleExpiryYearChange}
                  className="year-input"
                >
                  <option value="" selected disabled>
                    Year
                  </option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
              </div>
              <div class="inputBox">
                <span>CVV</span>
                <input
                  type="text"
                  maxLength="4"
                  value={cvv}
                  onChange={handleCvvChange}
                  onMouseEnter={handleCvvMouseEnter}
                  onMouseLeave={handleCvvMouseLeave}
                />
              </div>
            </div>
            <input type="submit" value="submit" class="submit-btn" />
          </form>
        </div>
      </div>
    </Box>
  );
};

export default ManageCards;
