import React from "react";
import "../style/Card.css";

const Card = ({ book }) => {
  return (
    <div className="card-container">
      <div className="card-item">
        <h2>{book.title}</h2>
        <img
          src={book?.imageLinks?.smallThumbnail}
          alt={book?.title}
          className="card-image"
        />
        <p>Auteur: {book?.volumeInfo?.authors}</p>
        <p>Description: {book?.volumeInfo?.description}</p>
      </div>
    </div>
  );
};

export default Card;
