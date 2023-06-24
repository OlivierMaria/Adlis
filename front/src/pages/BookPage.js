import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import defaultImage from "../assets/img/Nopicture.png";

const BookPage = () => {
  const { title } = useParams();
  const [book, setBook] = useState(null);

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
    <div className="book-details ">
      <div className="left-column ">
        <img
          src={book?.imageLinks?.smallThumbnail || defaultImage}
          alt={book?.title}
        />
      </div>
      <div className="right-column">
        <h2>{book.title}</h2>
        <h2>{book.categories}</h2>
        <h5>{book.description}</h5>
        <div class="flex gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Ajouter à mes livres
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
            Ajouter une critique
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
