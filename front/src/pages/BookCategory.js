import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card.js";
import axios from "axios";

const BookCategory = () => {
  //! Récupération de la clef API dans le fichier .env.local
  const apiKey = process.env.REACT_APP_MY_KEY;
  const [books, setBooks] = useState([]);
  const { category } = useParams();

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

  return (
    <div>
      <h1>Voici le rendu de la catégorie : {category}</h1>
      <div className="row">
        {books.map((book) => (
          <Card key={book.id} book={book.volumeInfo} />
        ))}
      </div>
    </div>
  );
};

export default BookCategory;
