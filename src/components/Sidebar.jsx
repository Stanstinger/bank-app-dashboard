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
import Logo from "../data/logo.png";

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
  props,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  userAccount,
  logInStatus,
}) => {
  const window = props;

  const handleDrawerToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const logOut = () => logInStatus(false);

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const drawer = (
    <>
      <Box width="100%">
        <Box m="1.5rem 2rem 2rem 3rem">
          <FlexBetween color={colors.primary[400]}>
            <Box display="flex" alignItems="center" gap="0.5rem">
              <Box
                component="img"
                alt="profile"
                src={Logo}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Typography
                variant="h5"
                fontWeight="bold"
                color={colors.primary[400]}
              >
                BANKEASE
              </Typography>
            </Box>
            {!isNonMobile && (
              <IconButton onClick={handleDrawerToggle}>
                <ChevronLeft sx={{ color: colors.primary[400] }} />
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
                    handleDrawerToggle();
                  }}
                  sx={{
                    backgroundColor:
                      active === lcText ? colors.primary[300] : "transparent",

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

            <Typography fontSize="0.8rem" sx={{ color: colors.primary[400] }}>
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
            ml: "1.5rem",
            mt: "0.9rem",
            gap: "1rem",
          }}
          onClick={logOut}
        >
          <LogoutOutlined sx={{ color: colors.grey[700] }} />
          <Typography
            textTransform="capitalize"
            fontSize="1rem"
            fontWeight="700"
            sx={{ color: colors.grey[700] }}
          >
            Logout
          </Typography>
        </Button>
      </Box>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="Dashboard Folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={!isSidebarOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        anchor="left"
        sx={{
          display: { xs: "block", sm: "block", md: "none" },
          "& .MuiDrawer-paper": {
            color: colors.primary[400],
            backgroundColor: colors.primary[500],
            boxSizing: "border-box",
            width: drawerWidth,
            borderWidth: isNonMobile ? 0 : "2px",
            borderTopRightRadius: "1rem",
            borderBottomRightRadius: "1rem",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        container={container}
        onClose={handleDrawerToggle}
        variant="permanent"
        open={!isSidebarOpen}
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            color: colors.primary[400],
            backgroundColor: colors.primary[500],
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
