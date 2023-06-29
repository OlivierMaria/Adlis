import React from "react";
import "../style/Footer.css";
import Logo from "../assets/img/logo.png";

const Footer = () => {
  const currentDate = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 py-8 mt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="mr-2 logo-size" />
          <div className="text-center ml-8">
            <a href="/rgpd">Lien vers RGPD</a>
            <span>|</span>
            <a href="/api">Lien vers l'API</a>
          </div>
        </div>
        <p className="text-gray-600 text-right mr-4">
          Tous droits réservés à l'équipe Adlis &copy; {currentDate}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
