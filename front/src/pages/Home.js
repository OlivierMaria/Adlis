import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import the Link component
import { FaBook, FaUser } from "react-icons/fa"; // Import the necessary icons
import "../style/Home.css";
import Card from "../components/Card.js";
import SearchBar from "../components/SearchBar.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carrousel from "../components/Carrousel.js";
import logoImg from "../assets/img/logo.png";

const Home = () => {
  const [books, setBooks] = useState([]); // State variable to store books

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() !== "") {
      // If search term is not empty
      const baseUrl = "https://www.googleapis.com/books/v1/volumes";
      const maxResults = 20; // Maximum number of results per page (you can adjust this value)
      let startIndex = 0; // Start index for the first page

      // Array to store all fetched books
      let allBooks = [];

      const fetchBooks = () => {
        const url = `${baseUrl}?q=${encodeURIComponent(
          searchTerm
        )}&startIndex=${startIndex}&maxResults=${maxResults}&key=AIzaSyB4EoQJB44Ys7oF9V2MB377tJjERIRkVsg`; // Replace "YOUR_API_KEY" with your own API key

        axios
          .get(url)
          .then((response) => {
            console.log(response.data); // Log the response data to the console
            const books = response.data.items || []; // Get the array of books from the response

            allBooks = [...allBooks, ...books]; // Append the fetched books to the existing array

            const totalItems = response.data.totalItems || 0; // Get the total number of items

            // If there are more books to fetch, increase the startIndex and fetch the next page
            if (allBooks.length < totalItems) {
              startIndex += maxResults;
              fetchBooks();
            } else {
              setBooks(allBooks); // Update the books state with all fetched books
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

      fetchBooks(); // Start fetching books
    } else {
      setBooks([]); // Reset books state if search term is empty
    }
  };

  return (
    <div className="home-container">
      <div className="navbar">
        <nav>
          <div className="left-section">
            <div className="logo-container">
              <Link to="/">
                <img src={logoImg} alt="Logo" className="logo-img" />
              </Link>
            </div>
            <ul className="menu-items">
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li></li>
              <li>
                <Link to="/about">A propos</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="centered-input">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="right-section">
            <ul className="profile-items">
              <li>
                <Link to="/books">
                  <FaBook />
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <FaUser />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <Carrousel />
      {/* Pass the handleSearch function to the SearchBar component */}
      <div className="row">
        {books && books.length > 0 ? (
          books.map((book) => <Card key={book} book={book.volumeInfo} />)
        ) : (
          <p>Aucun livre n'a été trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
