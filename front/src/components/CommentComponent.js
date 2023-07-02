import { useForm } from "react-hook-form";
import "../style/components/Comment.css";
import { FaArrowUp } from "react-icons/fa";
import React, { useState, useEffect } from "react";

const CommentComponent = (props) => {
  const { handleReview, handleDelete } = props;
  const userParse = JSON.parse(localStorage.getItem("userData"));
  const currentUser = localStorage.getItem("token");
  const userId = userParse ? userParse.user_id : null;
  const [showBackToTop, setShowBackToTop] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const validOptions = {
    review: {
      required: {
        value: true,
        message: "Le commentaire ne doit pas être vide.",
      },
      minLength: {
        value: 12,
        message: "Le commentaire doit comporter au moins 12 caractères.",
      },
    },
  };

  // Submit the form data
  const handleSubmitData = (data) => {
    if (currentUser) {
      handleReview(data.review);
      reset();
    } else {
      setError("user", {
        type: "manual",
        message: "Connectez-vous pour laisser un commentaire.",
      });
    }
  };

  // Handle page scrolling
  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  // Scroll back to the top of the page
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
      <div className="comment-container">
        <h2>Critiques</h2>
        <form
          className="comment-form"
          onSubmit={handleSubmit(handleSubmitData)}
        >
          <input
            type="text"
            {...register("review", validOptions.review)}
            placeholder="Entrez votre critique"
            max="250"
            min="2"
          />
          {errors.user && (
            <small className="text-danger">{errors.user.message}</small>
          )}
          {errors.review && (
            <small className="text-danger">{errors.review.message}</small>
          )}

          <button type="submit">Publier</button>
        </form>
        <br />

        <h1>Critiques récentes</h1>
        <br />
        <ul className="comment-list">
          {props.reviews !== null ? (
            props.reviews.map((item, index) => (
              <li key={index} className="comment-item">
                <div className="comment-user">
                  <span className="comment-username">&bull; {item[2]}</span>
                  <p
                    className="comment-content"
                    style={{
                      backgroundColor: `rgba(247, 247, 247, ${
                        item[3].length * 0.01
                      })`,
                    }}
                  >
                    {item[3]}
                  </p>
                </div>
                {userId !== null && userId === item[1] && (
                  <button
                    onClick={() => handleDelete(item[0])}
                    className="comment-delete"
                  >
                    Supprimer
                  </button>
                )}
              </li>
            ))
          ) : (
            <li className="no-comments">
              Aucune critique pour le moment. Soyez le premier à écrire une
              critique !
            </li>
          )}
        </ul>

        {showBackToTop && (
          <button
            className="fixed bottom-6 right-6 z-10 flex items-center justify-center w-10 h-10 text-white bg-gray-800 rounded-full shadow-lg focus:outline-none"
            onClick={handleBackToTop}
            aria-label="Revenir en haut"
          >
            <FaArrowUp />
          </button>
        )}
      </div>
    </>
  );
};

export default CommentComponent;
