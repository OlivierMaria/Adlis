import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Home.css";
import Card from "../components/Card.js";
import SearchBar from "../components/SearchBar.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carrousel from "../components/Carrousel.js";
import Footer from "../components/Footer.js";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //! Récupération de la clef API dans le fichier .env.local
  const apiKey = process.env.REACT_APP_MY_KEY;

  //! Récupération de 6 livres pour les catégories et de 40 livres lors de la recherche dans l'input
  const maxResults = 6;
  const searchMaxResults = 40;
  const navigate = useNavigate();

  //! Récupération des données par catégories

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
      console.log(categoryData);

      setCategories(categoryData);
    } catch (error) {
      console.log(error);
      setCategories([]);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  //! Récupération des données lors d'une recherche dans l'input
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.trim() !== "") {
        try {
          const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=${searchMaxResults}&key=${apiKey}`;
          const response = await axios.get(url);
          const books = response.data.items || [];
          setSearchResults(books);
        } catch (error) {
          console.log(error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  //! Passage de la fonction handleSearch si les résultats sont supérieurs à 0
  const handleSearch = (searchTerm) => {
    if (searchTerm.length >= 0) {
      setSearchTerm(searchTerm);
    }
  };

  return (
    <div className="home-container">
      <Carrousel />
      <SearchBar onSearch={handleSearch} />
      {searchTerm.trim() !== "" && searchResults.length > 0 ? (
        <div className="category-container">
          <div className="category-header">
            <h2>Résultats de recherche pour "{searchTerm}"</h2>
          </div>
          <div className="row">
            {searchResults.map((book) => (
              <Card key={book.id} book={book.volumeInfo} />
            ))}
          </div>
        </div>
      ) : (
        categories.map((categoryData) => (
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
                <Card key={book.id} book={book.volumeInfo} bookId={book.id} />
              ))}
            </div>
          </div>
        ))
      )}

      <Footer />
    </div>
  );
};

export default Home;
