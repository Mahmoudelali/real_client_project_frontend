import React from 'react';
import "./Sidebar.css"
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <nav className="sidebar">
      <NavLink exact to="/" activeClassName="active"  style={{display: "block"}}>
        Home
      </NavLink>
      <NavLink to="/categories" activeClassName="active"  style={{display: "block"}}>
        Categories
      </NavLink>
      <NavLink to="/instructions" activeClassName="active"  style={{display: "block"}}>
        Instructions
      </NavLink>
      <NavLink to="/orders" activeClassName="active"  style={{display: "block"}}>
        Orders
      </NavLink>
      <NavLink to="/about" activeClassName="active"  style={{display: "block"}}>
        About Us
      </NavLink>
      <NavLink to="/contact" activeClassName="active"  style={{display: "block"}}>
        Contact Us
      </NavLink>
      <NavLink to="/profile" activeClassName="active"  style={{display: "block"}}>
        Profile
      </NavLink>
      <NavLink to="/admin/dashboard/home" activeClassName="active"  style={{display: "block"}}>
        Dashboard
      </NavLink>
    </nav>
  );
}

export default Sidebar;
