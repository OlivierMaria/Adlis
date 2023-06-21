import React from "react";
import { useParams } from "react-router-dom";
import defaultImage from "../assets/img/Nopicture.png";

const BookPage = ({ book }) => {
  const { id } = useParams(); // Récupérer l'ID du livre à partir des paramètres de la route

  // Utilisez l'ID pour récupérer les détails du livre et les afficher
  return (
    <div>
      <h2>Détails du livre avec l'ID "{id}"</h2>
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
