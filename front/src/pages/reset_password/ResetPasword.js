import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../components/Form";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmitRequest = (data) => {
    handleResetPassword(data);
  };

  // Handle password reset
  const handleResetPassword = (data) => {
    axios
      .post(
        "https://adlis-077af6a0b065.herokuapp.com/identity/password_reset",
        data
      )
      .then((res) => {
        navigate("/signin");
        // If the email is valid and verified, a password reset email will be sent
        alert("Si l'e-mail est valide et vérifié, vous recevrez un e-mail.");
      })
      .catch((error) => {
        navigate("/signin");
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        } else {
          setError(
            "Une erreur s'est produite lors de la réinitialisation du mot de passe."
          );
        }
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <h2>Récupération de mot de passe</h2>
        <p>
          Si vous êtes déjà enregistré chez nous, vous recevrez un e-mail avec
          les instructions pour réinitialiser votre mot de passe.
        </p>
        <Form
          email="Adresse Email"
          button="Envoyer"
          sendData={handleSubmitRequest}
        />
        {error && <p className="error">{error}</p>}
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
