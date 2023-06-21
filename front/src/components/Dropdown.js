import React from "react";

const Dropdown = () => {
  return (
    <div class="dropdown">
      <button>Profile</button>
      <div class="dropdown-options">
        <a href="#">Connexion</a>
        <a href="#">Inscription</a>
        <a href="#">Profil</a>
        <a href="#">Déconnexion</a>
      </div>
    </div>
  );
};

export default Dropdown;
