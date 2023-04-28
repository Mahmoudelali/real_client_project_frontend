import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import { Grid } from "@mui/material";

//icons
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const social = [
  {
    icon: <FaFacebook />,
    link: "https://www.facebook.com/yehia.masri.90",
  },
  {
    icon: <FaInstagram />,
    link: "https://www.instagram.com/yehiamasri/",
  },
  {
    icon: <FaWhatsapp />,
    link: "/admin/dashboard/users",
  },
];

function Footer() {
  return (
    <div>
      <footer>
        <div className="footer-footer">
          <div className="footer-row">
            <div className="footer-socials">
            {social.map(({ icon, link }, index) => {
              return (
                <NavLink className="footer-social-link" key={index} to={link}>
                  <Grid item xs={1}>
                    {icon}
                  </Grid>
                </NavLink>
              );
            })}
            </div>
          <div className="footer-contacts">
            <h3 className="footer-contact">Contact-US:</h3>
            <a href="mailto:yehiamasri83@gmail.com" className="footer-contact-link">By Email: yehiamasri83@gmail.com</a>
            <a href="tel:+96171871678" className="footer-contact-link">By Phone: +96171871678</a>
          </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
