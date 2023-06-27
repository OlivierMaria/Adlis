import React, { useState } from "react";

const CommentComponent = ({ props }) => {
  const [review, setReview] = useState("");

  const handleSubmit = (review) => {
    props.handleReview(review);
    setReview("");
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
