import axios from "axios";
import React from "react";

import { Link, useNavigate } from "react-router-dom";
import Form from "./Form";

const ResetPassword = () => {
  const navigate = useNavigate();

  const handleSubmitRequest = (data) => {
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

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Récupération de mot de passe</h2>
        <p className="form-description">
          Si vous êtes déjà enregistré chez nous, vous recevrez un email avec
          les instructions pour réinitialiser votre mot de passe.
        </p>
        <Form
          email="Adresse Email"
          button="envoyer"
          handleSubmitRequest={handleSubmitRequest}
        />
        <br />
        <div className="form-group">
          <Link to="/" className="form-link">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
