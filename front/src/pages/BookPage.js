import React from "react";
import { useParams } from "react-router-dom";
import defaultImage from "../assets/img/Nopicture.png";
import Navbar from "../components/Navbar.js";

const BookPage = ({ book }) => {
  const { title } = useParams();

  return (
    <div>
      <Navbar />
      <h2>Détails du livre "{title}"</h2>
      <h2>{book.title}</h2>
      <img
        src={book?.imageLinks?.smallThumbnail || defaultImage}
        alt={book?.title}
        className="card-image"
      />
    </div>
  );
};

export default BookPage;
