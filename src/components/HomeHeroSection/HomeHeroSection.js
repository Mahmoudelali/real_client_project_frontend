import React from "react";
import "./HomeHeroSection.css";
import Image from "../../images/photo.jpeg";

function HomeHeroSection() {
  return (
    <div className="hero-container">
      <img src={Image} alt="Hero section" />
      <div className="hero-content">
        <h1>Welcome to Khizana</h1>
        <p>Transform your closet into your own online store</p>
      </div>
    </div>
  );
}

export default HomeHeroSection;
