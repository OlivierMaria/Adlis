import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import defaultImage from "../assets/img/Nopicture.webp";
import CommentComponent from "../components/CommentComponent.js";

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [booksFavorite, setBooksFavorite] = useState(null);
  const [isBookAdded, setIsBookAdded] = useState(null);
  const token = localStorage.getItem("token");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetches book details from the Google Books API
  const fetchBook = () => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((response) => {
        const book = response.data;
        setBook(book.volumeInfo);
      })
      .catch((error) => {
        console.log(error);
        setBook(null);
      });
  };

  // Fetches reviews for the book from the custom book reviews API
  const fetchReviews = () => {
    axios
      .get("https://adlis-077af6a0b065.herokuapp.com/book_reviews", {
        params: { book_id: id },
      })
      .then((response) => {
        const reviewsData = response.data;
        setReviews(reviewsData);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setReviews(null);
      });
  };

  // Posts a review for the book to the custom book reviews API
  const postReview = (data) => {
    const reviewData = {
      review: data,
      book_id: id,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        "https://adlis-077af6a0b065.herokuapp.com/book_reviews",
        reviewData,
        config
      )
      .then((response) => {
        console.log("Review posted successfully");
        alert("Review posted successfully");
        fetchReviews();
      })
      .catch((error) => {
        console.error("Error posting review:", error);
      });
  };

  // Deletes a review for the book from the custom book reviews API
  const deleteReview = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(
        `https://adlis-077af6a0b065.herokuapp.com/book_reviews/${id}`,
        config
      )
      .then((response) => {
        console.log("Review deleted successfully");
        fetchReviews();
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
      });
  };

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
        setIsBookAdded(response.data.includes(id));
        fetchReviews();
      })
      .catch((error) => {
        console.error("Error retrieving favorite books:", error);
      });
  };

  // Handles adding or removing the book from the user's favorite list
  const handleFavorite = () => {
    if (!token) {
      setErrorMessage("Veuillez vous connecter avant d'ajouter aux favoris.");
      return;
    }
    if (isBookAdded) {
      const confirmation = window.confirm(
        "Êtes-vous sûr(e) de vouloir supprimer ce livre de votre liste ?"
      );
      if (confirmation) {
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
            setIsBookAdded(false);
            fetchBooksFavorite();
          })
          .catch((error) => {
            console.error("Error removing book:", error);
            localStorage.clear();
          });
      }
    } else {
      const favoriteData = {
        book_id: id,
      };
      axios
        .post("https://adlis-077af6a0b065.herokuapp.com/books", favoriteData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Book added successfully");
          setIsBookAdded(true);
          fetchBooksFavorite();
        })
        .catch((error) => {
          console.error("Error adding book:", error);
        });
    }
  };

  useEffect(() => {
    if (token) {
      fetchBooksFavorite();
    }
    fetchBook();
    fetchReviews();
  }, [token]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="book-details">
        <div className="left-column">
          <img
            src={book?.imageLinks?.smallThumbnail || defaultImage}
            alt={book?.title}
            className="h-60 w-50"
          />
        </div>
        <div className="right-column">
          <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
          <h2 className="text-lg font-medium mb-2">{book.categories}</h2>
          <h5 className="text-sm text-gray-600">{book.description}</h5>
          <button
            onClick={handleFavorite}
            className={`${
              booksFavorite && booksFavorite.includes(id)
                ? "favorite-button-active"
                : "favorite-button"
            }`}
          >
            {booksFavorite && booksFavorite.includes(id)
              ? "Dans ma liste"
              : "Ajouter à mes livres"}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>

      <CommentComponent
        handleDelete={deleteReview}
        handleReview={postReview}
        reviews={reviews}
      />
    </>
  );
};

export default BookPage;
