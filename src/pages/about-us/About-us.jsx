import React from "react";
import "./about-us.css";
import AboutUsImage from "../../images/pic1-min.jpg";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1 className="about-us-title">About Us</h1>
      <div className="about-us-content">
        <img src={AboutUsImage} alt="About Us" className="about-us-image" />
        <p className="about-us-description">
          Khizana is a vibrant online marketplace where you can easily Buy & Sell
          a wide variety of fashion items, both new and vintage fashion. With Khizana,
          you have the power to transform your closet into your very own online
          store, enabling you to declutter and make space for beautiful new finds.
          Join our community today and discover the joy of fashion!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
