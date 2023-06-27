import React, { useState } from "react";

const CommentComponent = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment !== "") {
      const comment = {
        id: new Date().toLocaleDateString(),
        text: newComment,
      };
      setComments([...comments, comment]);
      setNewComment("");
      setIsAddingComment(false);
    }
  };

  const handleCommentButtonClick = () => {
    setIsAddingComment(true);
  };

  const handleCommentDelete = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg mt-8">
      <div className="mb-4">
        {isAddingComment ? (
          <form onSubmit={handleCommentSubmit} className="flex">
            <input
              type="text"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Entrez votre critique"
              className="border border-gray-300 p-2 rounded-l-md flex-grow"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-r-md"
            >
              Enregistrer
            </button>
          </form>
        ) : (
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            onClick={handleCommentButtonClick}
          >
            Ajouter une critique
          </button>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Commentaires</h2>
        {comments.length === 0 ? (
          <p>Aucun commentaire pour le moment.</p>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="border-b border-gray-300 py-2 flex items-center justify-between"
              >
                <span>
                  {comment.text} {comment.id}
                </span>
                <button
                  onClick={() => handleCommentDelete(comment.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CommentComponent;
