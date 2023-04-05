import React from "react";
import "./index.css";
import Header from "../../components/Header";
import chip from "../../data/chip.png";
import visa from "../../data/visa.png";
import mapImage from "../../data/map.png";
import patternImage from "../../data/pattern.png";

const Cards = ({ account }) => {
  return (
    <div className="cards-section">
      <div className="header-content">
        <Header
          title="Cards"
          subtitle="All cards linked to your bank account are displayed here."
        />
      </div>
      <div className="cards-container">
        <>
          {account.cards.map((card, i) => {
            return (
              <div
                key={`${card.cardNumber}-${i}`}
                className="card__box-container"
              >
                <div className="card-box">
                  <div className="card-face card-front">
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
                    <div className="card-number">
                      <span>{card.cardNumber.substring(0, 4)}</span>
                      <span>{card.cardNumber.substring(4, 8)}</span>
                      <span>{card.cardNumber.substring(8, 12)}</span>
                      <span>{card.cardNumber.substring(12, 16)}</span>
                    </div>
                    <div className="card__info-title">
                      <span>CARD HOLDER</span>
                      <span>VALID TILL</span>
                    </div>
                    <div className="card-info">
                      <span>{account.name.toUpperCase()}</span>
                      <span>
                        {card.expiryMonth}/{card.expiryYear.substring(2, 4)}
                      </span>
                    </div>
                  </div>
                  <div className="card-face card-back">
                    <div className="map">
                      <img src={mapImage} alt="map" />
                    </div>
                    <div className="back-images">
                      <div className="cvv-box">
                        <div className="pattern">
                          <img src={patternImage} alt="pattern" />
                        </div>
                        <span> {card.cvv}</span>
                      </div>
                      <div className="message">
                        <p> This is a virtual card design</p>
                      </div>
                      <div className="signature-box">
                        <div>
                          <p>CUSTOMER SIGNATURE</p>
                        </div>
                        <div className="visa">
                          <img src={visa} alt="visa" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      </div>
    </div>
  );
};

export default Cards;
