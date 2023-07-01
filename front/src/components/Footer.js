import React from "react";
import "../style/Footer.css";
import Logo from "../assets/img/logo.webp";

const Footer = () => {
  const currentDate = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="items">
          <img src={Logo} alt="Logo" className="mr-2 logo-size" />
        </div>
        <p className="paragraphe">
          Tous droits réservés à l'équipe Adlis &copy; {currentDate}
        </p>
        <div className="link">
          <a href="/rgpd">Lien vers RGPD</a>
          <span>|</span>
          <a
            href="https://developers.google.com/books?hl=fr"
            target="_blank"
            rel="noreferrer"
          >
            Lien vers l'API
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
