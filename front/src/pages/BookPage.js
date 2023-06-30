import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import defaultImage from "../assets/img/Nopicture.jpg";
import CommentComponent from "../components/CommentComponent.js";

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState(null);
  // const [booksFavorite, setBooksFavorite] = useState(null);
  // const [isBookAdded, setIsBookAdded] = useState(null);
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

  const reviewPost = (data) => {
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
      .post("http://127.0.0.1:3000/book_reviews", reviewData, config)
      .then((response) => {
        console.log("Commentaire posté avec succès");
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
        console.log("Commentaire supprimé avec succès");
        fetchReviews();
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du commentaire :", error);
      });
  };

  // const FetchBooksFavorite = () => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   axios
  //     .get(`http://127.0.0.1:3000/books`, config)
  //     .then((response) => {
  //       setBooksFavorite(response.data);
  //       console.log("Commentaire supprimé avec succès");
  //       fetchReviews();
  //     })
  //     .catch((error) => {
  //       console.error("Erreur lors de la suppression du commentaire :", error);
  //     });
  // };

  // const handleFavorite = () => {
  //   if (isBookAdded) {
  //     const confirmation = window.confirm(
  //       "Voulez-vous vraiment supprimer ce livre de votre liste ?"
  //     );
  //     if (confirmation) {
  //       const favoriteData = {
  //         book_id: id,
  //       };
  //       axios
  //         .delete(`http://127.0.0.1:3000/books/${id}`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //           data: favoriteData,
  //         })
  //         .then((response) => {
  //           console.log("Livre supprimé avec succès");
  //           setIsBookAdded(false);
  //         })
  //         .catch((error) => {
  //           console.error("Erreur lors de la suppression du livre :", error);
  //           localStorage.clear();
  //         });
  //     }
  //   } else {
  //     const favoriteData = {
  //       book_id: id,
  //     };
  //     axios
  //       .post("http://127.0.0.1:3000/books", favoriteData, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         console.log("Livre ajouté avec succès");
  //         setIsBookAdded(true);
  //       })
  //       .catch((error) => {
  //         console.error("Erreur lors de l'ajout du livre :", error);
  //       });
  //   }
  // };

  useEffect(() => {
    // FetchBooksFavorite();
    fetchBook();
    fetchReviews();
  }, []);

  if (!book) {
    return <div>Loading...</div>;
  }

  // const isBookInFavorites =
  //   booksFavorite && booksFavorite.find((favorite) => favorite.book_id === id);

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
          {/* <button
            onClick={handleFavorite}
            className={`${
              booksFavorite && booksFavorite.includes(id)
                ? "bg-black"
                : "bg-black-300"
            } hover:bg-black-300 text-white font-semibold py-2 px-4 rounded mb-4 mt-4`}
          >
            {booksFavorite && booksFavorite.includes(id)
              ? "dans ma liste"
              : "Ajouter à mes livres"}
          </button> */}
        </div>
      </div>
      <CommentComponent
        handleDelete={reviewDelete}
        handleReview={reviewPost}
        reviews={reviews}
      />
    </>
  );
};

export default BookPage;
