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
      const url = `${baseUrl}?q=${encodeURIComponent(searchTerm)}&key=`; // Replace "YOUR_API_KEY" with your own API key
      axios
        .get(url)
        .then((response) => {
          console.log(response.data); // Log the response data to the console
          setBooks(response.data.items); // Update the books state with the fetched data
        })
        .catch((error) => {
          console.log(error);
        });
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
