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
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-paragraph">
          Any questions or remarks? Just write us a Message! <br></br>
        </p>
        <div className="contact-contact-box">
          <div className="contact-contact-left">
            <h3 className="contact-h3">Contact Information</h3>
            <table>
              <tr className="contact-tr">
                <td className="contact-td">
                  <FaEnvelope />
                </td>
                <td className="contact-td">khizana@gmail.com</td>
              </tr>
              <tr className="contact-tr">
                <td className="contact-td">
                  <FaPhone />
                </td>
                <td className="contact-td">+961 00 000 000</td>
              </tr>
            </table>
          </div>
          <div className="contact-contact-right">
            <h3 className="contact-h3">Send Your Message</h3>
            <form ref={form} onSubmit={sendEmail}>
              <div className="contact-input-row">
                <div className="contact-input-group">
                  <label className="contact-label">First Name</label>
                  <input type="text" placeholder="Yehia" className="contact-input" name="user_Fname" />
                </div>
                <div className="contact-input-group">
                  <label className="contact-label">Last Name</label>
                  <input type="text" placeholder=" Masri" className="contact-input" name="user_Lname" />
                </div>
              </div>
              <div className="contact-input-row">
                <div className="contact-input-group">
                  <label className="contact-label">Phone</label>
                  <input
                  className="contact-input"
                    type="text"
                    placeholder="+961 00 000 000 "
                    name="phone"
                  />
                </div>
                <div className="contact-input-group">
                  <label className="contact-label">Email</label>
                  <input
                  className="contact-input"
                    type="text"
                    placeholder=" example@gmail.com"
                    name="user_email"
                  />
                </div>
              </div>
              <label className="contact-label">Message</label>
              <textarea
              className="contact-area"
                name="message"
                rows="5"
                placeholder="Your Message"
              ></textarea>

              <button className="contact-button" type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
