import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import defaultImage from "../assets/img/Nopicture.png";
import Navbar from "../components/Navbar.js";

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
    <div>
      <Navbar />
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
