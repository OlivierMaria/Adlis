import React from "react";
import Adlismp4 from "../assets/video/Adlismp4.mp4";
import "../style/About.css"; // Import du fichier CSS pour les styles spécifiques à About
import Footer from "../components/Footer.js";
import { FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";

const About = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-title">À propos d'ADLIS</h1>
          <p className="about-text">
            Bienvenue sur ADLIS, votre destination en ligne pour découvrir et
            explorer le monde de la littérature. Chez ADLIS, nous sommes
            passionnés par les livres et nous souhaitons partager cette passion
            avec vous.
          </p>
          <p className="about-text">
            Notre mission est de faciliter l'accès à une vaste sélection de
            livres et de permettre à nos utilisateurs de découvrir de nouvelles
            histoires, d'approfondir leurs connaissances et de trouver
            l'inspiration à travers la lecture. Nous croyons fermement au
            pouvoir des mots pour informer, divertir et transformer nos vies,
            c'est pourquoi nous nous efforçons de créer une plateforme
            conviviale et enrichissante pour tous les amoureux des livres.
          </p>
          <p className="about-text">
            ADLIS est conçu pour offrir une expérience de recherche de livres
            exceptionnelle. Notre puissant moteur de recherche vous permet de
            trouver facilement des titres, des auteurs ou des sujets spécifiques
            qui suscitent votre intérêt. Nous rassemblons des informations
            complètes sur les livres, y compris les résumés, les critiques, les
            notes et les informations sur les auteurs, afin que vous puissiez
            prendre des décisions éclairées sur vos prochaines lectures.
          </p>
          <p className="about-text">
            De plus, ADLIS propose des fonctionnalités personnalisées pour
            améliorer votre expérience. Vous pouvez créer votre profil, établir
            des listes de lecture, suivre vos auteurs préférés et interagir avec
            une communauté d'amoureux des livres partageant les mêmes intérêts.
            Notre objectif est de vous offrir une plateforme où vous pouvez non
            seulement trouver des livres, mais également échanger des
            recommandations, partager vos opinions et découvrir de nouvelles
            perspectives.
          </p>
          <p className="about-text">
            Chez ADLIS, nous nous engageons à offrir un service fiable, sécurisé
            et convivial. Nous respectons la confidentialité de vos données
            personnelles et nous mettons tout en œuvre pour garantir la sécurité
            de vos informations. Nous travaillons en étroite collaboration avec
            des éditeurs, des librairies et d'autres partenaires de confiance
            pour vous offrir un accès étendu à un large éventail de livres. Nous
            apprécions les commentaires de nos utilisateurs et nous sommes
            constamment à l'écoute de vos suggestions pour améliorer ADLIS et
            répondre à vos besoins. Nous sommes fiers de construire une
            communauté engagée autour de la lecture et nous espérons que vous
            trouverez ADLIS comme un compagnon précieux dans votre voyage
            littéraire.
          </p>
          <p className="about-text">
            Rejoignez-nous dès aujourd'hui et plongez dans un monde infini de
            découvertes littéraires avec ADLIS !
          </p>
        </div>
        <div className="about-video-container">
          <video className="about-video" autoPlay loop muted>
            <source src={Adlismp4} type="video/mp4" />
            Votre navigateur ne prend pas en charge la lecture de vidéos.
          </video>
        </div>
        {showBackToTop && (
          <button
            className="fixed bottom-6 right-6 z-10 flex items-center justify-center w-10 h-10 text-white bg-gray-800 rounded-full shadow-lg focus:outline-none"
            onClick={handleBackToTop}
            aria-label="Back to top"
          >
            <FaArrowUp />
          </button>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default About;
