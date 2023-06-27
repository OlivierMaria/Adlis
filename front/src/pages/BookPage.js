import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import defaultImage from "../assets/img/Nopicture.png";
import CommentComponent from "../components/CommentComponent.js";

const BookPage = () => {
  const { title } = useParams();
  const [book, setBook] = useState(null);

  //! Récuperation du livre par title pour définir l'endpoint
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            title
          )}`
        );
        const books = response.data.items || [];
        if (books.length > 0) {
          setBook(books[0].volumeInfo);
          console.log(response.data.items);
        }
      } catch (error) {
        console.log(error);
        setBook(null);
      }
    };

    fetchBook();
  }, [title]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="book-details">
        <div className="left-column">
          <img
            src={book?.imageLinks?.smallThumbnail || defaultImage}
            alt={book?.title}
          />
        </div>
        <div className="right-column">
          <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
          <h2 className="text-lg font-medium mb-2">{book.categories}</h2>
          <h5 className="text-sm text-gray-600">{book.description}</h5>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4">
            Ajouter à mes livres
          </button>
        </div>
      </div>
      <CommentComponent book={book} />
    </>
  );
};

export default BookPage;
