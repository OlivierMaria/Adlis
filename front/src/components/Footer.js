import React from 'react';
import "../style/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>À propos de nous</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor sem non semper scelerisque.</p>
          </div>
          <div className="col-md-3">
            <h3>Liens utiles</h3>
            <ul>
              <li><a href="#">Accueil</a></li>
              <li><a href="#">Produits</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Contactez-nous</h3>
            <ul>
              <li><i className="fa fa-map-marker"></i> 123 Rue Principale, Ville, Pays</li>
              <li><i className="fa fa-phone"></i> +12 345 678 910</li>
              <li><i className="fa fa-envelope"></i> info@example.com</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
