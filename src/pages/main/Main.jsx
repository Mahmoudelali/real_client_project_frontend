import React from "react";
import "./Main.css";
import HomeHeroSection from "../../components/HomeHeroSection/HomeHeroSection";
import HomeCategorySection from "../../components/HomeCategorySection/HomeCategorySection";
import HomeProductSection from "../../components/HomeProductSection/HomeProductSection";

function Main() {
  return (
    <>
      <HomeHeroSection />
      <HomeCategorySection />
      <HomeProductSection />
    </>
  );
}

export default Main;
