import React, { useState } from "react";
import chip from "../../data/chip.png";
import creditCard from "../../data/visa.png";
import "./index.css";
import stripeImage from "../../data/pattern.png";
import Header from "../../components/Header";

const ManageCards = ({ account }) => {
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
    <div className="manage-container">
      <div className="manage-header">
        <Header
          title="Manage Your Cards"
          subtitle="Add or remove any card from your account easily."
        />
      </div>

      <div className="manage__card-box">
        <div className={`card-container ${isFlipped ? "flipped" : ""}`}>
          <div className="face front">
            <div className="images">
              <div className="chip-image">
                <img src={chip} alt="chip" />
              </div>
              <div className="visa-image">
                <img src={creditCard} alt="credit card" />
              </div>
            </div>
            <div className="card-number-box">
              <span>{cardNumber.substring(0, 4) || "####"}</span>
              <span>{cardNumber.substring(4, 8) || "####"}</span>
              <span>{cardNumber.substring(8, 12) || "####"}</span>
              <span>{cardNumber.substring(12, 16) || "####"}</span>
            </div>

            <div className="holder-details">
              <span>CARD HOLDER</span>
              <span>EXPIRES</span>
            </div>

            <div className="holder-info">
              <span>{cardHolder.toUpperCase() || "FULL NAME"}</span>

              <span>
                {expiryMonth || "MM "}/{expiryYear || "YY"}
              </span>
            </div>
          </div>
          <div className="face back">
            <div className="cvv-container">
              <div className="stripe">
                <img src={stripeImage} alt="pattern" />
              </div>
              <span>{cvv || "CVV"}</span>
            </div>
            <div className="back-message">
              <p> This is a virtual card design</p>
            </div>
            <div className="signature">
              <div>
                <p>CUSTOMER SIGNATURE</p>
              </div>
              <div className="visa-image">
                <img src={creditCard} alt="" />
              </div>
            </div>
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
          <input type="submit" value="ADD CARD" class="submit-btn" />
        </form>
      </div>
    </div>
  );
};

export default ManageCards;
