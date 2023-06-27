import { Link } from "react-router-dom";
import "../style/Navbar.css";
import React from "react";
import { FaBook } from "react-icons/fa";
import logoImg from "../assets/img/logo.png";
import Dropdown from "./Dropdown.js";

//! Navbar Component
const Navbar = () => {
  return (
    <>
      <nav>
        <div className="left-section">
          <div className="logo-container">
            <Link to="/">
              <img src={logoImg} alt="Logo" className="logo-img" />
            </Link>
          </div>
          <ul className="menu-items">
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>|</li>
            <li>
              <Link to="/about">A propos</Link>
            </li>
            <li>|</li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="right-section">
          <ul className="profile-items">
            <li>
              <Link to="/books">
                <FaBook />
              </Link>
            </li>
            <li>
              <Dropdown />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
