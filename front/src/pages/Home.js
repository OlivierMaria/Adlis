import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Home.css";
import Card from "../components/Card.js";
import SearchBar from "../components/SearchBar.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carrousel from "../components/Carrousel.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const apiKey = process.env.REACT_APP_MY_KEY;
  const maxResults = 6; // Définissez la variable maxResults ici
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = [
          { name: "Romance", searchTerm: "romance" },
          { name: "Sport", searchTerm: "sport" },
          { name: "Business", searchTerm: "business" },
          { name: "Science Fiction", searchTerm: "science-fiction" },
          { name: "Mystery", searchTerm: "mystery" },
        ];

        const baseUrl =
          "https://www.googleapis.com/books/v1/volumes?q=subject:{genre}";

        const categoryData = await Promise.all(
          categories.map(async (category) => {
            const url = `${baseUrl.replace(
              "{genre}",
              category.searchTerm
            )}&maxResults=${maxResults}&key=${apiKey}`;
            const response = await axios.get(url);
            const books = response.data.items || [];
            return { category, books };
          })
        );

        setCategories(categoryData);
      } catch (error) {
        console.log(error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="home-container">
      <Navbar />
      <Carrousel />
      <SearchBar onSearch={handleSearch} />
      {categories.map((categoryData) => (
        <div
          key={categoryData.category.searchTerm}
          className="category-container"
        >
          <div className="category-header">
            <h2>{categoryData.category.name}</h2>
            <button
              className="view-more-button"
              onClick={() =>
                navigate(`/list/${categoryData.category.searchTerm}`)
              }
            >
              Voir plus
            </button>
          </div>
          <div className="row">
            {categoryData.books.map((book) => (
              <Card key={book.id} book={book.volumeInfo} />
            ))}
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
};

export default Home;
