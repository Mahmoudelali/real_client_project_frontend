import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import { Grid } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

//icons
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const social = [
  {
    icon: <FaFacebook />,
    link: "https://www.facebook.com/MorlotStore",
  },
  {
    icon: <FaInstagram />,
    link: "https://instagram.com/khizana.store",
  },
  {
    icon: <FaWhatsapp />,
    link: "https://wa.me/+961 71 627 991",
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
                  <NavLink className="footer-social-link" key={index} target="_blank" to={link}>
                    <Grid item xs={1}>
                      {icon}
                    </Grid>
                  </NavLink>
                );
              })}
            </div>
            <div className="footer-contacts">
              <h3 className="footer-contact">Contact-US:</h3>
              <article>
                <a
                  href="mailto:louayhamie@gmail.com"
                  className="footer-contact-link"
                >
                  <Grid
                    sx={{
                      display: "inline",
                      verticalAlign: "middle",
                      marginRight: "8px",
                    }}
                  >
                    <AlternateEmailIcon />
                  </Grid>
                  louayhamie@gmail.com
                </a>
              </article>
              <article>
                <a href="tel:+96171871678" className="footer-contact-link">
                  <Grid sx={{ display: "inline", verticalAlign: "middle" ,  marginRight: "8px",}}>
                    <LocalPhoneIcon />
                  </Grid>
                  +961 71 627 991 
                </a>
              </article>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
