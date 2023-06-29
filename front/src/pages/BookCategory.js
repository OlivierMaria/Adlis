import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card.js";
import axios from "axios";
import { FaArrowUp } from "react-icons/fa";

const BookCategory = () => {
  //! Récupération de la clef API dans le fichier .env.local
  const apiKey = process.env.REACT_APP_MY_KEY;
  const [books, setBooks] = useState([]);
  const { category } = useParams();
  const [showBackToTop, setShowBackToTop] = useState(false);

  //! Récupération de 30 livres par categories
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const baseUrl =
          "https://www.googleapis.com/books/v1/volumes?q=subject:{genre}";
        const maxResults = 30;
        const url = `${baseUrl.replace(
          "{genre}",
          category
        )}&maxResults=${maxResults}&key=${apiKey}`;

        const response = await axios.get(url);
        const books = response.data.items || [];

        setBooks(books);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, [category, apiKey]);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <h1>Voici le rendu de la catégorie : {category}</h1>
      <div className="row">
        {books.map((book) => (
          <Card key={book.id} book={book.volumeInfo} bookId={book.id} />
        ))}
      </div>
      {showBackToTop && (
        <button
          className="fixed bottom-6 right-6 z-10 flex items-center justify-center w-10 h-10 text-white bg-gray-800 rounded-full shadow-lg focus:outline-none"
          onClick={handleBackToTop}
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default BookCategory;
