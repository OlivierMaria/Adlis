import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import logoImg from "../assets/img/logo.webp";
import Dropdown from "./Dropdown.js";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Handles the click event on the "Coup d'❤️" link
  const handleClick = () => {
    if (!token) {
      setTimeout(() => {
        alert("Connectez-vous avant de continuer");
        navigate("/signin");
      }, 0);
    }
  };

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
              <Link to="/about">À propos</Link>
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
              <Link to="/books" onClick={handleClick}>
                Coup d'❤️
              </Link>
            </li>
          </ul>
          <Dropdown />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
