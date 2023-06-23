import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const handleError = (errors) => {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = (data) => {
    handleResetPassword(data);
  };
  const handleResetPassword = (data) => {
    axios
      .post("http://127.0.0.1:3000/identity/password_reset", data)
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const resetOptions = {
    email: {
      required: "Email requis",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "l'adresse email n'est pas valide",
      },
    },
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Récupération de mot de passe</h2>
        <p className="form-description">
          Si vous êtes déjà enregistré chez nous, vous recevrez un email avec
          les instructions pour réinitialiser votre mot de passe.
        </p>
        <form
          className="form"
          onSubmit={handleSubmit(handleSubmitForm, handleError)}
        >
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email :
            </label>
            <input
              type="text"
              name="email"
              {...register("email", resetOptions.email)}
              className="input"
            />
            <small className="text-danger">
              {errors?.email && errors.email.message}
            </small>
          </div>
          <div className="form-group">
            <button type="submit" className="form-button">
              Envoyer
            </button>
            <Link to="/" className="form-link">
              Retour à l'accueil
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
