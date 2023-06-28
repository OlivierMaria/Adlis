import React from "react";
import "../style/Footer.css";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-8 mt-6">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
          <h3 className="text-xl font-semibold mb-4">À propos de nous</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor sem non semper scelerisque.
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
          <h3 className="text-xl font-semibold mb-4">Liens utiles</h3>
          <ul className="list-disc ml-6">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Accueil
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Produits
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
          <h3 className="text-xl font-semibold mb-4">Contactez-nous</h3>
          <ul className="list-disc ml-6">
            <li>
              <i className="fa fa-map-marker mr-2 text-gray-600"></i> 123 Rue
              Principale, Ville, Pays
            </li>
            <li>
              <i className="fa fa-phone mr-2 text-gray-600"></i> +12 345 678 910
            </li>
            <li>
              <i className="fa fa-envelope mr-2 text-gray-600"></i>{" "}
              info@example.com
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
