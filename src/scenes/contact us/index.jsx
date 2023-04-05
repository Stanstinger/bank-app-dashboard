import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./index.css";

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  EmailOutlined,
  PhoneOutlined,
  RoomOutlined,
  SendOutlined,
} from "@mui/icons-material";

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
    <div className="contact-container">
      <div className="contact-header">
        <Header
          title="Get in Touch"
          subtitle="Get help from our 24/7 support team on any issue."
        />
      </div>

      <div className="talk__to-us">
        <div className="talk-box">
          <span className="talk__box-title">Talk to Us</span>
          <div className="contact-details-box">
            <div className="icon-box">
              <RoomOutlined />
            </div>
            <div className="details-text">
              <span className="heading">Address</span>
              <span>4671 Sugar Camp Road </span>
              <span>Owantana, Minnesota</span>
              <span>55507</span>
            </div>
          </div>

          <div className="contact-details-box">
            <div className="icon-box">
              <EmailOutlined />
            </div>
            <div className="details-text">
              <span className="heading">Email</span>
              <span>gbank@gmail.com</span>
            </div>
          </div>

          <div className="contact-details-box">
            <div className="icon-box">
              <PhoneOutlined />
            </div>

            <div className="details-text">
              <span className="heading">Phone</span>
              <span>+1 507-475-6094</span>
            </div>
          </div>
        </div>
      </div>

      <div className="write__us-box">
        <span className="write__us-title">
          Write us a message. Response is instant.
        </span>

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
              name="message"
              cols="30"
              rows="10"
              className="contact__form-input"
              id="msg"
              placeholder="Write your message"
            ></textarea>
          </div>
          <div className="button-div">
            <div>
              <button className="button" onClick={success}>
                Send
                <SendOutlined />
              </button>
            </div>

            <div className="message">
              <div className="success" id="success">
                Your Message Successfully Sent!
              </div>
              <div class="danger" id="danger">
                Feilds Can't be Empty!
              </div>
            </div>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Contact;
