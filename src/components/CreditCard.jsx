import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

import chip from "../data/chip.png";
import visa from "../data/visa.png";
import mapImage from "../data/map.png";
import patternImage from "../data/pattern.png";

const CreditCard = ({ account }) => {
  const theme = useTheme();
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.only("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.only("md"));
  return (
    <>
      {account.cards.map((card, i) => {
        return (
          <Box
            key={`${card.cardNumber}-${i}`}
            sx={{
              width: isExtraSmallScreen
                ? "100%"
                : isSmallScreen
                ? "100%"
                : isMediumScreen
                ? "335px"
                : "500px",
              height: isExtraSmallScreen
                ? "100%"
                : isSmallScreen
                ? "100%"
                : isMediumScreen
                ? "210px"
                : "300px",
              backgroundColor: "#EEEDEB",
              cursor: "pointer",
              position: "relative",
              perspective: "1000px",
              "&:hover .flipper": {
                transform: "rotateY(-180deg)",
              },
            }}
            gridColumn={
              isExtraSmallScreen
                ? "1"
                : isSmallScreen
                ? "span 6"
                : isMediumScreen
                ? "span 6"
                : "span 5"
            }
            gridRow={
              isExtraSmallScreen
                ? "span 2"
                : isSmallScreen
                ? "span 2"
                : isMediumScreen
                ? "span 2"
                : "span 3"
            }
          >
            <Box
              className="flipper"
              sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                transition: "transform 1s ease",
                boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: "linear-gradient(45deg, #0045c7, #ff2c7d)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  p: "1.25rem 1.8rem",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  zIndex: 1,
                  transformStyle: "preserve-3d",
                  transition: "transform 0.5s ease",

                  backfaceVisibility: "hidden",
                }}
              >
                <Box
                  component="img"
                  alt="map"
                  src={mapImage}
                  width="100%"
                  position="absolute"
                  top="0"
                  left="0"
                  zIndex="-1"
                  sx={{
                    opacity: "0.3",
                  }}
                />
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box
                    component="img"
                    alt="chip"
                    src={chip}
                    width={isExtraSmallScreen ? "40px" : "60px"}
                    sx={{ objectFit: "cover" }}
                  />
                  <Box
                    component="img"
                    alt="visa"
                    src={visa}
                    width={isExtraSmallScreen ? "60px" : "80px"}
                    sx={{ objectFit: "cover" }}
                  />
                </Box>
                <Box display="flex" justifyContent="space-between" mt="1rem">
                  <Typography fontSize="1rem">
                    {card.cardNumber.substring(0, 4)}
                  </Typography>
                  <Typography fontSize="1rem">
                    {card.cardNumber.substring(4, 8)}
                  </Typography>
                  <Typography fontSize="1rem">
                    {card.cardNumber.substring(8, 12)}
                  </Typography>
                  <Typography fontSize="1rem">
                    {card.cardNumber.substring(12, 16)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mt="2.5rem">
                  <Typography fontSize="0.75rem">CARD HOLDER</Typography>
                  <Typography fontSize="0.75rem">VALID TILL</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mt="0.25rem">
                  <Typography fontSize="1.15rem">
                    {account.name.toUpperCase()}
                  </Typography>
                  <Typography fontSize="1.15rem">
                    {card.expiryMonth}/{card.expiryYear.substring(2, 4)}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: "linear-gradient(45deg, #0045c7, #ff2c7d)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  p: "1.25rem 1.8rem",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  zIndex: 1,
                  transformStyle: "preserve-3d",
                  transition: "transform 0.5s ease",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <Box
                  component="img"
                  alt="map"
                  src={mapImage}
                  width="100%"
                  position="absolute"
                  top="0"
                  left="0"
                  zIndex="-1"
                  sx={{
                    opacity: "0.3",
                  }}
                />
                <Box
                  ml="-1.75rem"
                  mr="-1.75rem"
                  mt="0.75rem"
                  height="60px"
                  sx={{
                    background: "#222",
                  }}
                />
                <Box mt="1.25rem">
                  <Box flex="1" display="flex">
                    <Box
                      component="img"
                      alt="visa"
                      src={patternImage}
                      width="80%"
                      display="block"
                      lineHeight="0"
                      sx={{ objectFit: "cover" }}
                    />
                    <Typography
                      sx={{
                        background: "#fff",
                        color: "#000",
                      }}
                      fontSize="1.35rem"
                      p="0.5rem  1rem"
                    >
                      {card.cvv}
                    </Typography>
                  </Box>
                </Box>
                <Box mt="1.875rem">
                  <Typography fontSize="1rem">
                    This is a virtual card design
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mt="1.875rem"
                >
                  <Typography>CUSTOMER SIGNATURE</Typography>
                  <Box
                    component="img"
                    alt="visa"
                    src={visa}
                    width="80px"
                    sx={{ objectFit: "cover" }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default CreditCard;
