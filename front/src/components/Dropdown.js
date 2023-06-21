import React from "react";
import { Link } from "react-router-dom";

const Dropdown = () => {
  return (
    <div class="dropdown">
      <button>Profile</button>
      <div class="dropdown-options">
        <Link to="/login">Connexion</Link>
        <Link to="/signup">Inscription</Link>
        <Link to="/dashboard">Profil</Link>
        <Link to="/logout">Déconnexion</Link>
      </div>
    </div>
  );
};

export default Dropdown;
