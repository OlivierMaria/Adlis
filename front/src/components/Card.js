import React from "react";
import "../style/Card.css";
import defaultImage from "../assets/img/Nopicture.png";

const Card = ({ book }) => {
  const bookTitle = encodeURIComponent(book?.title); // Encodage du titre du livre pour l'URL

  const handleClick = () => {
    // Rediriger vers la page Books avec les détails du livre
    window.location.href = `/books/${bookTitle}`;
  };

  return (
    <div className="card-container">
      <div className="card-item">
        <h2>{book.title}</h2>
        <img
          src={book?.imageLinks?.smallThumbnail || defaultImage}
          alt={book?.title}
          className="card-image"
        />

        <button onClick={handleClick}>J'y vais !</button>
      </div>
    </div>
  );
};

export default Card;
