import React, { useState } from "react";
import axios from "axios";

const CommentComponent = ({ bookId }) => {
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      book_id: bookId,
      review: review,
    };

    axios
      .post("/book_reviews", newComment)
      .then((response) => {
        // Traitement après la réussite de la requête
        console.log("Commentaire posté avec succès");
        // Réinitialiser le champ de saisie du commentaire
        setReview("");
      })
      .catch((error) => {
        // Traitement en cas d'erreur de la requête
        console.error("Erreur lors de la publication du commentaire :", error);
      });
  };

  return (
    <div>
      <h2>Commentaires</h2>
      <ul>{/* Affichage des commentaires existants */}</ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Entrez votre commentaire"
        />
        <button type="submit">Publier</button>
      </form>
    </div>
  );
};

export default CommentComponent;
