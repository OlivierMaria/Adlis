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
        <button>J'y vais !</button>
      </div>
    </div>
  );
};

export default Card;
