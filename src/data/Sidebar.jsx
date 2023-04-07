import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { tokens } from "../theme";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  LogoutOutlined,
} from "@mui/icons-material";

import { BiHomeAlt } from "react-icons/bi";
import { MdAdminPanelSettings } from "react-icons/md";
import { TbDeviceAnalytics } from "react-icons/tb";
import { GrTransaction, GrCurrency } from "react-icons/gr";
import { BsFillCreditCardFill } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";

const navItems = [
  {
    text: "Dashboard",
    icon: <BiHomeAlt />,
  },

  {
    text: "Data",
    icon: null,
  },

  {
    text: "Analytics",
    icon: <TbDeviceAnalytics />,
  },

  {
    text: "Transactions",
    icon: <GrTransaction />,
  },

  {
    text: "Cards",
    icon: <BsFillCreditCardFill />,
  },

  {
    text: "Payment",
    icon: <GrCurrency />,
  },

  {
    text: "Account",
    icon: null,
  },
  {
    text: "Settings",
    icon: <MdAdminPanelSettings />,
  },

  {
    text: "Manage Cards",
    icon: <BsFillCreditCardFill />,
  },

  {
    text: "Contact Us",
    icon: <FiPhoneCall />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  userAccount,
  logInStatus,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const logOut = () => logInStatus(false);

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: colors.primary[400],
              backgroundColor: colors.primary[500],
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
              borderRadius: "1.5rem 0 0 1.5rem",
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={colors.primary[400]}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color={colors.primary[400]}
                  >
                    G-BANK
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>

            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: "2.25rem 0 1rem 3rem" }}
                      color={colors.primary[400]}
                      // fontSize="1rem"
                    >
                      {text}
                    </Typography>
                  );
                }

                const lcText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? colors.primary[300]
                            : "transparent",

                        color:
                          active === lcText
                            ? colors.primary[400]
                            : colors.primary[400],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? colors.primary[400]
                              : colors.primary[400],
                          fontSize: "1.25rem",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={userAccount.userImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: colors.primary[400] }}
                >
                  {userAccount.name.split(" ")[0]}
                </Typography>

                <Typography
                  fontSize="0.8rem"
                  sx={{ color: colors.primary[400] }}
                >
                  {userAccount.accountLevel}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{ color: colors.primary[400], fontSize: "25px" }}
              />
            </FlexBetween>
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                mr: "4rem",
                ml: "0.5rem",
                mt: "0.9rem",
                gap: "1rem",
              }}
              onClick={logOut}
            >
              <LogoutOutlined />
              <Typography
                textTransform="capitalize"
                fontSize="1rem"
                sx={{ color: colors.greenAccent[100] }}
              >
                Logout
              </Typography>
            </Button>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;

const inputs = document.querySelectorAll(".input-fields");
const toggle_btn = document.querySelectorAll(".toggle");
const main_login = document.querySelector(".login-container");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main_login.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector("text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});
