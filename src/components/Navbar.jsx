import React, { useState } from "react";

import {
  MessageOutlined,
  NotificationsOutlined,
  DarkModeOutlined,
  SettingsOutlined,
  Menu as MenuIcon,
  Search,
  ArrowDropDownOutlined,
  Margin,
} from "@mui/icons-material";
import FlexBetween from "../components/FlexBetween";
import { useContext } from "react";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ColorModeContext, tokens } from "../theme";

const Navbar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  userAccount,
  logInStatus,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.only("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.only("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const logOut = () => logInStatus(false);

  const handleDrawerToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: colors.primary[500],
        boxShadow: "none",
        // paddingBottom: "1rem",
        maxWidth: "100vw",
        paddingRight: isExtraSmallScreen
          ? "1.25rem"
          : isSmallScreen
          ? "0"
          : "0",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", p: "0" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon sx={{ color: colors.grey[700], fontSize: "25px" }} />
          </IconButton>
          <FlexBetween
            backgroundColor={colors.primary[100]}
            borderRadius="9px"
            gap={isExtraSmallScreen ? "1rem" : isSmallScreen ? "2rem" : "3rem"}
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search
                sx={{
                  color: colors.primary[400],
                  fontSize: isExtraSmallScreen
                    ? "1.25rem"
                    : isSmallScreen
                    ? "1.5rem"
                    : "1.5rem",
                }}
              />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween>
          {/* <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined
                sx={{ color: colors.grey[700], fontSize: "25px" }}
              />
            ) : (
              <LightModeOutlined
                sx={{ color: colors.grey[700], fontSize: "25px" }}
              />
            )}
          </IconButton> */}

          <IconButton>
            <NotificationsOutlined
              sx={{
                color: colors.primary[400],
                fontSize: isExtraSmallScreen
                  ? "1.25rem"
                  : isSmallScreen
                  ? "1.5rem"
                  : "1.5rem",
              }}
            />
          </IconButton>

          <IconButton>
            <MessageOutlined
              sx={{
                color: colors.primary[400],
                fontSize: isExtraSmallScreen
                  ? "1.25rem"
                  : isSmallScreen
                  ? "1.5rem"
                  : "1.5rem",
              }}
            />
          </IconButton>

          <IconButton>
            <SettingsOutlined
              sx={{
                color: colors.primary[400],
                fontSize: isExtraSmallScreen
                  ? "1.25rem"
                  : isSmallScreen
                  ? "1.5rem"
                  : "1.5rem",
              }}
            />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={userAccount.userImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />

              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
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
              <ArrowDropDownOutlined
                sx={{ color: colors.primary[400], fontsize: "1.5rem" }}
              />
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={logOut}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
