import React, { useState } from "react";

import {
  LightModeOutlined,
  MessageOutlined,
  NotificationsOutlined,
  DarkModeOutlined,
  SettingsOutlined,
  Menu as MenuIcon,
  Search,
  ArrowDropDownOutlined,
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

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const logOut = () => logInStatus(false);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon sx={{ color: colors.grey[700], fontSize: "25px" }} />
          </IconButton>
          <FlexBetween
            backgroundColor={colors.primary[400]}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined
                sx={{ color: colors.grey[700], fontSize: "25px" }}
              />
            ) : (
              <LightModeOutlined
                sx={{ color: colors.grey[700], fontSize: "25px" }}
              />
            )}
          </IconButton>

          <IconButton>
            <NotificationsOutlined
              sx={{ color: colors.grey[700], fontSize: "25px" }}
            />
          </IconButton>

          <IconButton>
            <MessageOutlined
              sx={{ color: colors.grey[700], fontSize: "25px" }}
            />
          </IconButton>

          <IconButton>
            <SettingsOutlined
              sx={{ color: colors.grey[700], fontSize: "25px" }}
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
                  sx={{ color: colors.grey[900] }}
                >
                  {userAccount.name.split(" ")[0]}
                </Typography>
                <Typography fontSize="0.8rem" sx={{ color: colors.grey[700] }}>
                  {userAccount.accountLevel}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: colors.grey[900], fontsize: "25px" }}
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
