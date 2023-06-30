import axios from "axios";
import React from "react";

import { Link, useNavigate } from "react-router-dom";
import Form from "../../components/Form";

const ResetPassword = () => {
  const navigate = useNavigate();

  const handleSubmitRequest = (data) => {
    handleResetPassword(data);
  };
  const handleResetPassword = (data) => {
    axios
      .post(
        "https://adlis-077af6a0b065.herokuapp.com/identity/password_reset",
        data
      )
      .then((res) => {
        navigate("/signin");
        alert("si l'email est valide et verifié vous receverez un email");
      })
      .catch((error) => {
        navigate("/signin");
        alert("si l'email est valide et verifié vous receverez un email");
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <h2>Récupération de mot de passe</h2>
        <p>
          Si vous êtes déjà enregistré chez nous, vous recevrez un email avec
          les instructions pour réinitialiser votre mot de passe.
        </p>
        <Form
          email="Adresse Email"
          button="envoyer"
          sendData={handleSubmitRequest}
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
