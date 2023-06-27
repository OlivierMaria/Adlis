import { useForm } from "react-hook-form";

const CommentComponent = (props) => {
  const { handleReview } = props;
  const currentUser = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
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
    } else {
      setError("user", {
        type: "manual",
        message: "Connectez-vous pour laisser un commentaire.",
      });
    }
  };

  return (
    <div>
      <h2>Commentaires</h2>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <input
          type="text"
          {...register("review", validOptions.review)}
          placeholder="Entrez votre commentaire"
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

      <h1>Critiques</h1>
      <br />
      <ul>
        {props.reviews !== null ? (
          props.reviews.map((item, index) => (
            <li key={index}>
              <strong>{item[0]} :</strong> {item[1]}
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
