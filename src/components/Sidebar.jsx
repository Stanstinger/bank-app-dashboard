import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "../data/customer-2.jpg";
import { tokens } from "../theme";
import {
  Box,
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
  HomeOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  AdminPanelSettingsOutlined,
} from "@mui/icons-material";

import { TbDeviceAnalytics } from "react-icons/tb";
import { GrTransaction, GrCurrency } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { BsFillCreditCardFill } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },

  {
    text: "Data",
    icon: null,
  },
  {
    text: "Overview",
    icon: <RxDashboard />,
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
    icon: <AdminPanelSettingsOutlined />,
  },

  {
    text: "Manage Cards",
    icon: <BsFillCreditCardFill />,
  },

  {
    text: "Call Center",
    icon: <FiPhoneCall />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
              color: colors.primary[200],
              backgroundColor: colors.primary[400],
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
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
                    color={colors.greenAccent[200]}
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
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
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
                            : colors.primary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? colors.primary[400]
                              : colors.primary[200],
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
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: colors.greenAccent[200] }}
                >
                  Michael
                </Typography>

                <Typography
                  fontSize="0.8rem"
                  sx={{ color: colors.greenAccent[100] }}
                >
                  Platinum
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{ color: colors.greenAccent[300], fontSize: "25px" }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
