/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import defaultImage from "../assets/img/Nopicture.jpg";
import CommentComponent from "../components/CommentComponent.js";

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState(null);
  const token = localStorage.getItem("token");

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

  const fetchReviews = () => {
    axios
      .get("http://127.0.0.1:3000/book_reviews", { params: { book_id: id } })
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

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, []);

  if (!book) {
    return <div>Loading...</div>;
  }

  const handleReviewDelete = (id) => {
    reviewDelete(id);
    console.log("id" + id);
  };
  const handleReview = (data) => {
    const reviewData = {
      review: data,
      book_id: id,
    };
    reviewPost(reviewData);
  };

  const reviewPost = (data) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post("http://127.0.0.1:3000/book_reviews", data, config)
      .then((response) => {
        console.log("Commentaire posté avec succès");
        // alert("Commentaire posté avec succès");
        fetchReviews();
      })
      .catch((error) => {
        console.error("Erreur lors de la publication du commentaire :", error);
      });
  };

  const reviewDelete = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`http://127.0.0.1:3000/book_reviews/${id}`, config)
      .then((response) => {
        console.log("Commentaire suprimé avec succès");

        fetchReviews();
      })
      .catch((error) => {
        console.error("Erreur lors de la supressiondu commentaire :", error);
      });
  };
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
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4 mt-4">
            Ajouter à mes livres
          </button>
        </div>
      </div>
      <CommentComponent
        handleDelete={handleReviewDelete}
        handleReview={handleReview}
        reviews={reviews}
      />
    </>
  );
};

export default BookPage; */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import defaultImage from "../assets/img/Nopicture.jpg";
import CommentComponent from "../components/CommentComponent.js";

const BookPage = ({ bookData, handleSelectedBookData }) => {
  const { id } = useParams();
  const [book, setBook] = useState(bookData);
  const [reviews, setReviews] = useState(null);
  const token = localStorage.getItem("token");
  console.log(token);

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

  const fetchReviews = () => {
    axios
      .get("http://127.0.0.1:3000/book_reviews", { params: { book_id: id } })
      .then((response) => {
        const reviewsData = response.data;
        setReviews(reviewsData);
      })
      .catch((error) => {
        console.log(error);
        setReviews(null);
      });
  };

  useEffect(() => {
    if (!book) {
      fetchBook();
      fetchReviews();
    }
  }, [book]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const handleReview = (data) => {
    const reviewData = {
      review: data,
      book_id: id,
    };
    reviewPost(reviewData);
  };

  const handleFavorite = async () => {
    const favoriteData = {
      book_id: id,
    };
    try {
      const response = await axios.post("http://127.0.0.1:3000/books", favoriteData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Ajout du livre aux favoris :", response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre :", error);
    }
  };

  const reviewPost = (data) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post("http://127.0.0.1:3000/book_reviews", data, config)
      .then((response) => {
        console.log("Commentaire posté avec succès");
      })
      .catch((error) => {
        console.error("Erreur lors de la publication du commentaire :", error);
      });
  };

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
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4 mt-4"
            onClick={handleFavorite}
          >
            Ajouter à mes livres
          </button>
        </div>
      </div>
      <CommentComponent handleReview={handleReview} reviews={reviews} />
    </>
  );
};

export default BookPage;




