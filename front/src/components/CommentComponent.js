import { useForm } from "react-hook-form";

const CommentComponent = (props) => {
  const { handleReview, handleDelete } = props;
  const userParse = JSON.parse(localStorage.getItem("userData"));
  const currentUser = localStorage.getItem("token");
  const userId = userParse ? userParse.user_id : null;

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

  return (
    <div>
      <h2>Critiques</h2>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <input
          type="text"
          {...register("review", validOptions.review)}
          placeholder="Entrez votre critique"
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

      <h1>Critiques recentes</h1>
      <br />
      <ul>
        {props.reviews !== null ? (
          props.reviews.map((item, index) => (
            <li key={index}>
              <strong>{item[2]} :</strong> {item[3]}
              {userId !== null && userId === item[1] && (
                <button
                  onClick={() => handleDelete(item[0])}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              )}
            </li>
          ))
        ) : (
          <li>
            Aucune critique pour le moment. Soyez le premier à écrire une
            critique !
          </li>
        )}
      </ul>
    </div>
  );
};

export default CommentComponent;
