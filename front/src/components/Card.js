import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/Card.css";
import defaultImage from "../assets/img/Nopicture.png";

const Card = ({ book }) => {
  const { title } = useParams();
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
