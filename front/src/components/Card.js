import React from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../style/Card.css";
import defaultImage from "../assets/img/Nopicture.jpg";
import { FaEye } from "react-icons/fa";

AOS.init(); // Initialisez AOS dans votre composant

const Card = ({ book, bookId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/books/${bookId}`);
  };

  const truncatedTitle = book?.title.substring(0, 12);
  const truncatedAuthor = book?.authors?.[0]?.substring(0, 14);

  return (
    <div className="card-container mx-3">
      <div className="card-item">
        <div className="pictures">
          <img
            src={book?.imageLinks?.smallThumbnail || defaultImage}
            alt={book?.title}
            className="card-image rounded-t-lg h-40 w-40 object-cover"
            data-aos="zoom-out-down"
          />
        </div>
        <div className="card-content p-4">
          <h2 className="text-lg font-semibold">{truncatedTitle}..</h2>
          <p className="text-gray-500 overflow-ellipsis overflow-hidden max-h-16">
            {truncatedAuthor}..
          </p>
          <button
            onClick={handleClick}
            className="mt-2 px-4 py-2 text-sm font-medium flex items-center justify-between focus:outline-none focus:bg-blue-600"
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
