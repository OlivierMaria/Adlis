import React from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../style/Card.css";
import defaultImage from "../assets/img/Nopicture.webp";
import { FaEye } from "react-icons/fa";

AOS.init(); // Initialize AOS in your component

const Card = ({ book, bookId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/books/${bookId}`);
  };

  // Truncate book title and author for display
  const truncatedTitle = book?.title.substring(0, 12);
  const truncatedAuthor = book?.authors?.[0]?.substring(0, 14);

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-img">
          <img
            src={book?.imageLinks?.smallThumbnail || defaultImage}
            alt={book?.title}
            className="card-image rounded-t-lg h-40 w-40 object-cover"
            data-aos="zoom-out-down"
          />
        </div>
        <div className="card-content">
          <h2 className="text-lg font-semibold">{truncatedTitle}..</h2>
          <p className="text-gray-500 overflow-ellipsis overflow-hidden max-h-16">
            {truncatedAuthor}..
          </p>
          <button
            onClick={handleClick}
            className="mt-2 pl-9 py-2 text-sm font-medium flex bg-gray-50 focus:outline-none focus:bg-blue-600"
          >
            <span>Voir plus</span>
            <FaEye className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
