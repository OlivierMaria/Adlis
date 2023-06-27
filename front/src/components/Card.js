import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/Card.css";
import defaultImage from "../assets/img/Nopicture.png";

const Card = ({ book }) => {

//! Redirection vers la page /books/title (Title du livre)
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/books/${encodeURIComponent(book.title)}`);
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
