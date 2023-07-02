import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowUp } from "react-icons/fa";
import "../style/Home.css";
import Card from "../components/Card.js";
import SearchBar from "../components/SearchBar.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carrousel from "../components/Carrousel.js";
import Footer from "../components/Footer.js";

const Home = () => {
  // State variables
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Constants
  const apiKey = process.env.REACT_APP_MY_KEY;
  const maxResults = 5;
  const searchMaxResults = 40;
  const navigate = useNavigate();

  // Fetch categories from Google Books API
  const fetchCategories = async () => {
    try {
      const categories = [
        { name: "Romance ❤️", searchTerm: "romance" },
        { name: "Sport ⛹️‍♂️", searchTerm: "sport" },
        { name: "Business 💼", searchTerm: "business" },
        { name: "Science Fiction 👽", searchTerm: "science-fiction" },
        { name: "Mystery 🕵️", searchTerm: "mystery" },
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

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch search results based on the search term
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

  // Handle search term input
  const handleSearch = (searchTerm) => {
    if (searchTerm.length > 0) {
      setSearchTerm(searchTerm);
    }
  };

  // Handle scroll event to show or hide the "Back to Top" button
  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  // Scroll to the top of the page
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
    <>
      <div className="home-container">
        <Carrousel />
        <SearchBar onSearch={handleSearch} />
        {searchTerm.trim() !== "" && searchResults.length > 0 ? (
          <div className="category-container">
            <div className="category-header">
              <h2>Search results for "{searchTerm}"</h2>
            </div>
            <div className="row">
              {searchResults.map((book) => (
                <Card key={book.id} book={book.volumeInfo} bookId={book.id} />
              ))}
            </div>
          </div>
        ) : (
          categories.map((categoryData) => (
            <div
              key={categoryData.category.searchTerm}
              className="category-container"
            >
              <div className="category-header flex justify-between items-center mt-5">
                <h2 className="text-left ml-2">
                  Category {categoryData.category.name}
                </h2>
                <div className="barre"></div>
                <button
                  className="ml-2"
                  onClick={() =>
                    navigate(`/list/${categoryData.category.searchTerm}`)
                  }
                >
                  Voir Plus
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
    </>
  );
};

export default Home;
