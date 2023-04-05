import React, { useState } from "react";
import { Button } from "@mui/material";
import Header from "../../components/Header";
import "./index.css";

const Settings = ({ account }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const handleEmailChange = (e) => {
    e.preventDefault();
    if (account.email !== email) {
      setErrorEmail("Email does not match account");
      return;
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorPass("Passwords do not match");
      return;
    }
    // validate passwords and update password in database
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (account.email === email) {
      account.pin = password;
      console.log(account.pin);
      console.log(password);
    } else {
      setErrorEmail("Email does not match account");
      return;
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <div className="settings-container">
      <div className="settings-header">
        <Header
          title="Account Settings"
          subtitle="Update all your information here."
        />
      </div>

      <div className="personal-info">
        <div className="personal__info-title">
          <span>Personal Info</span>
        </div>
        <div className="profile-content">
          <div className="profile-image">
            <img src={account.userImage} alt="profile image" />
          </div>

          <div className="profile-info">
            <span>Name : {account.name}</span>
            <span>Email : {account.email}</span>
            <span>Account ID : {account.registerdId}</span>
            <span>Phone : {account.phone}</span>
          </div>
        </div>
      </div>
      <div className="account-management">
        <div className="management-header">
          <span>Account Management</span>
        </div>
        <div className="change__pass-container">
          <span>Change Password</span>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <span>Email</span>
              <input
                type="email"
                value={email}
                placeholder="johndoe@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                error={errorEmail !== ""}
                helperText={errorEmail}
              />
            </div>
            <div className="input-box">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span>Confirm Password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errorPass !== ""}
                helperText={errorPass}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={(e) => {
                handleEmailChange(e);
                handlePasswordChange(e);
              }}
              sx={{ alignSelf: "flex-start" }}
            >
              Change Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
