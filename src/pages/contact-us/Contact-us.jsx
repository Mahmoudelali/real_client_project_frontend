import React from "react";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import "./contact-us.css";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_m99ggko",
        "template_2ieqq6c",
        form.current,
        "Ani8vvPy_gOoeacm_"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <div>
      <div className="container">
        <h1>Contact Us</h1>
        <p>
          Any questions or remarks? Just write us a Message! <br></br>
        </p>
        <div className="contact-box">
          <div className="contact-left">
            <h3>Contact Information</h3>
            <table>
              <tr>
                <td>
                  <FaEnvelope />
                </td>
                <td>khizana@gmail.com</td>
              </tr>
              <tr>
                <td>
                  <FaPhone />
                </td>
                <td>+961 00 000 000</td>
              </tr>
            </table>
          </div>
          <div className="contact-right">
            <h3>Send Your Message</h3>
            <form ref={form} onSubmit={sendEmail}>
              <div className="input-row">
                <div className="input-group">
                  <label>First Name</label>
                  <input type="text" placeholder="Yehia " name="user_Fname" />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input type="text" placeholder=" Masri" name="user_Lname" />
                </div>
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="+961 00 000 000 "
                    name="phone"
                  />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder=" example@gmail.com"
                    name="user_email"
                  />
                </div>
              </div>
              <label>Message</label>
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
              ></textarea>

              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
