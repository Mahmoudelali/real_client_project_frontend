import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

import NotesSharpIcon from "@mui/icons-material/NotesSharp";
import Khizana from "../../images/Picsart_23-04-05_12-35-00-032.jpg";
import KhizanaWord from "../../images/khizanaWhite.png";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";

function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    console.log("showSidebar before update:", showSidebar);
    setShowSidebar(!showSidebar);
    console.log("showSidebar after update:", showSidebar);
  };

  return (
    <div className="nav-container">
      <div className="nav-left">
        <NotesSharpIcon
          sx={{
            color: "#FFFFFF",
            "&:hover": {
              transform: "scale(1.2)",
              transition: "0.3s ease-out",
              color: "#FC6D26",
            },
          }}
          onClick={toggleSidebar} // add onClick event listener to toggle the sidebar
        />
        {showSidebar && <Sidebar />} {/* conditionally render the sidebar */}
      </div>
      <div className="nav-center">
        {/* Use img tag on mobile view */}
        <img src={Khizana} alt="khizana-logo" className="logo-mobile" />

        {/* Use div tag with background image on desktop view */}
        <div
          className="logo-desktop"
          style={{ backgroundImage: `url(${KhizanaWord})` }}
        ></div>
      </div>
      <div className="nav-right">
        <Link to="/cart">
          <LocalMallRoundedIcon
            sx={{
              color: "#FFFFFF",
              "&:hover": {
                transform: "scale(1.2)",
                transition: "0.3s ease-out",
                color: "#FC6D26",
              },
            }}
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
