import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/Home.css";
import Card from "../components/Card.js";
import SearchBar from "../components/SearchBar.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carrousel from "../components/Carrousel.js";
import Navbar from "../components/Navbar.js";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const baseUrl =
      "https://www.googleapis.com/books/v1/volumes?q=subject:{genre}";
    const maxResults = 30;

    const url = `${baseUrl}?q=${encodeURIComponent(
      searchTerm
    )}&maxResults=${maxResults}&key=AIzaSyB4EoQJB44Ys7oF9V2MB377tJjERIRkVsg`;

    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        const books = response.data.items || [];
        setBooks(books);
      })
      .catch((error) => {
        console.log(error);
        setBooks([]);
      });
  }, [searchTerm]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="home-container">
      <Navbar />
      <Carrousel />
      <SearchBar onSearch={handleSearch} />
      <div className="row">
        {books.map((book) => (
          <Card key={book.id} book={book.volumeInfo} />
        ))}
      </div>
    </div>
  );
};

export default Home;
