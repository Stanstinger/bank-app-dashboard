import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./index.css";
import { tokens } from "../../theme";

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  EmailOutlined,
  PhoneOutlined,
  RoomOutlined,
  SendOutlined,
} from "@mui/icons-material";
import {
  Button,
  Box,
  Typography,
  IconButton,
  useTheme,
  TextField,
} from "@mui/material";
import Header from "../../components/Header";

const success = () => {
  var Name = document.getElementById("name");
  var email = document.getElementById("email");
  var msg = document.getElementById("msg");
  const success = document.getElementById("success");
  const danger = document.getElementById("danger");

  if (Name.value === "" || email.value === "" || msg.value === "") {
    danger.style.display = "block";
  } else {
    setTimeout(() => {
      Name.value = "";
      email.value = "";
      msg.value = "";
    }, 2000);

    success.style.display = "block";
    toast.success("Your Message Succesfully Sent!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  setTimeout(() => {
    danger.style.display = "none";
    success.style.display = "none";
  }, 4000);
};

const Contact = () => {
  const form = useRef();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_lecmnda",
      "template_m0bxwwi",
      form.current,
      "aEaQ1XwFujnAVXtt5"
    );
    e.target.reset();
  };

  return (
    <Box m="20px">
      <Box>
        <Header
          title="Get in Touch"
          subtitle="Get help from our 24/7 support team on any issue."
        />
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="6rem"
        gap="1rem"
        margin="2rem"
      >
        <Box gridColumn="span 6">
          <Box
            display="flex"
            flexDirection="column"
            width="19rem"
            alignItems="left"
            justifyContent="center"
          >
            <Typography
              variant="h4"
              color={colors.grey[900]}
              fontWeight="bold"
              mb="2rem"
            >
              Talk to Us
            </Typography>
            <Box
              background-color="#fff"
              padding="1rem"
              border-radius="0.75rem"
              mb="2rem"
              display="flex"
              gap="1rem"
            >
              <Box
                background-color="#ffffff"
                border="1px solid rgba(0, 0, 0, 0.1)"
                padding="1rem"
                width="3rem"
                height="3rem"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="50%"
              >
                <RoomOutlined />
              </Box>
              <Box>
                <Typography variant="h6" color={colors.grey[700]}>
                  Address
                </Typography>
                <Typography color=" hsl(0, 0%, 46%)">
                  4671 Sugar Camp Road{" "}
                </Typography>
                <Typography color=" hsl(0, 0%, 46%)">
                  Owantana, Minnesota
                </Typography>
                <Typography color=" hsl(0, 0%, 46%)">55507</Typography>
              </Box>
            </Box>

            <Box
              background-color="#fff"
              padding="1rem"
              border-radius="0.5rem"
              text-align="center"
              mb="2rem"
              display="flex"
              gap="1rem"
            >
              <Box
                background-color="white"
                border="1px solid rgba(0, 0, 0, 0.1)"
                padding="1rem"
                width="3rem"
                height="3rem"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="50%"
              >
                <EmailOutlined />
              </Box>
              <Box>
                <Typography variant="h6" color={colors.grey[700]}>
                  Email
                </Typography>
                <Typography color=" hsl(0, 0%, 46%)">
                  gbank@gmail.com
                </Typography>
              </Box>
            </Box>

            <Box
              background-color="#fff"
              padding="1rem"
              border-radius="0.75rem"
              text-align="center"
              mb="0.75rem"
              display="flex"
              gap="1rem"
            >
              <Box
                background-color="white"
                border="1px solid rgba(0, 0, 0, 0.1)"
                padding="1rem"
                width="3rem"
                height="3rem"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="50%"
              >
                <PhoneOutlined />
              </Box>

              <Box>
                <Typography variant="h6" color={colors.grey[700]}>
                  Phone
                </Typography>
                <Typography color=" hsl(0, 0%, 46%)">
                  +1 507-475-6094
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box gridColumn="span 6">
          <Typography
            variant="h4"
            color={colors.grey[900]}
            fontWeight="bold"
            mb="2rem"
          >
            Write us a message. Response is instant.
          </Typography>

          <form ref={form} onSubmit={sendEmail} className="contact__form">
            <div className="contact__form-div">
              <label className="contact__form-tag">Name</label>

              <input
                type="text"
                name="name"
                className="contact__form-input"
                id="name"
                placeholder="Insert your name"
              />
            </div>

            <div className="contact__form-div">
              <label className="contact__form-tag">Mail</label>

              <input
                type="email"
                name="email"
                className="contact__form-input"
                id="email"
                placeholder="Insert your email"
              />
            </div>

            <div className="contact__form-div  contact__form-area">
              <label className="contact__form-tag">Message</label>
              <textarea
                name="project"
                cols="30"
                rows="10"
                className="contact__form-input"
                id="msg"
                placeholder="Write your message"
              ></textarea>
            </div>
            <Box display="flex">
              <Box>
                <button className="button" onClick={success}>
                  Send
                  <SendOutlined />
                </button>
              </Box>

              <div className="message">
                <div className="success" id="success">
                  Your Message Successfully Sent!
                </div>
                <div class="danger" id="danger">
                  Feilds Can't be Empty!
                </div>
              </div>
            </Box>
            <ToastContainer />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
