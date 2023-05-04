import React, { useContext } from "react";
import "./home.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { isLoggedIn } from "../../App";

const Home = () => {
  const [loggedIn] = useContext(isLoggedIn);
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Outlet />
      {loggedIn && location.pathname !== "/post" && (
        <Link to="/post">
          <AddCircleOutlineIcon className="home-add" />
        </Link>
      )}
      <Footer />
    </>
  );
};

export default Home;
