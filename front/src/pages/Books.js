import React, { useEffect, useState } from "react";
import axios from "axios";

const Books = () => {
  const [booksFavorite, setBooksFavorite] = useState([]);
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem("token");

  // Fetches the user's favorite books from the local server
  const fetchBooksFavorite = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`https://adlis-077af6a0b065.herokuapp.com/books`, config)
      .then((response) => {
        setBooksFavorite(response.data);
        console.log("Favorite books retrieved successfully");
      })
      .catch((error) => {
        console.error("Error retrieving favorite books:", error);
      });
  };

  const fetchBooks = async () => {
    try {
      const apiKey = process.env.REACT_APP_MY_KEY;
      const bookIds = booksFavorite.map((book) => book);
      console.log(bookIds);

      const booksData = [];

      for (const bookId of bookIds) {
        const url = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`;
        const response = await axios.get(url);
        const bookData = response.data;
        booksData.push(bookData);
      }

      setBooks(booksData);
    } catch (error) {
      console.log(error);
      setBooks([]);
    }
  };

  useEffect(() => {
    fetchBooksFavorite();
  }, [token]);

  useEffect(() => {
    fetchBooks();
  }, [booksFavorite]);

  // Deletes a review for the book from the custom book reviews API
  const deleteFavorite = (id) => {
    const favoriteData = {
      book_id: id,
    };
    axios
      .delete(`https://adlis-077af6a0b065.herokuapp.com/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: favoriteData,
      })
      .then((response) => {
        console.log("Book removed successfully");

        fetchBooksFavorite();
      })
      .catch((error) => {
        console.error("Error removing book:", error);
        localStorage.clear();
      });
  };

  return (
    <div className="books-container">
      {books.map((book) => (
        <div key={book.id} className="book">
          <img
            src={book.volumeInfo?.imageLinks?.smallThumbnail}
            alt={book.volumeInfo?.title}
            className="book-image"
          />
          <div className="book-details">
            <div className="book-title">{book.volumeInfo?.title}</div>
            <div className="book-author">
              {book.volumeInfo?.authors?.join(", ")}
            </div>
          </div>
          <button onClick={() => deleteFavorite(book.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Books;
