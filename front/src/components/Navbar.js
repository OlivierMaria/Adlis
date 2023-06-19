import { Link } from "react-router-dom";
import "../style/Navbar.css";
import React from "react";
import SearchBar from "./SearchBar.js";
import { FaUser, FaBook } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <button>
              <Link to="/">Accueil</Link>
            </button>
          </li>
          <li>
            <Link to="/about">A propos</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <SearchBar />
          </li>
          <li>
            <Link to="/books">
              <FaBook />
            </Link>
            <Link to="/login">
              <FaUser />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
