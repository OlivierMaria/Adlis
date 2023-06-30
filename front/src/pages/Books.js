import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const Books = () => {
  const [selectedBookData, setSelectedBookData] = useState(null);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      try {
        const response = await axios.get(
          "https://adlis-077af6a0b065.herokuapp.com/books",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const favoriteBooksData = response.data;
        setFavoriteBooks(favoriteBooksData);
      } catch (error) {
        console.log(error);
        setFavoriteBooks([]);
      }
    };

    fetchFavoriteBooks();
  }, [token]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const baseUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${id}`;

        const response = await axios.get(baseUrl);
        const booksData = response.data.items || [];

        setBooks(booksData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, [id]);

  const handleSelectedBookData = (bookData) => {
    setSelectedBookData(bookData);
  };

  const handleFavorite = async (book) => {
    try {
      const response = await axios.post(
        "https://adlis-077af6a0b065.herokuapp.com/books",
        { book_id: book.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Ajout du livre aux favoris :", response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre :", error);
    }
  };

  return (
    <div>
      <Card books={books} handleFavorite={handleFavorite} />
    </div>
  );
};

export default Books;
