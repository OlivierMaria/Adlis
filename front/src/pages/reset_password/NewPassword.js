import React from "react";
import Form from "../../components/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewPassword = () => {
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmitRequest = (data) => {
    handlePasswordReset(data);
  };

  // Handle password reset
  const handlePasswordReset = (data) => {
    const token = new URLSearchParams(window.location.search).get("sid");
    data.sid = token;

    axios
      .patch(
        `https://adlis-077af6a0b065.herokuapp.com/identity/password_reset`,
        data
      )
      .then((response) => {
        // Password successfully updated
        alert("Le mot de passe a été mis à jour avec succès");
        navigate("/signin");
      })
      .catch((error) => {
        // Error updating password
        alert("Erreur lors de la mise à jour du mot de passe");
      });
  };

  return (
    <div>
      <Form
        password="nouveau mot de passe"
        passwordConfirmation="confirmation nouveau mot de passe"
        button="Modifier mon mot de passe"
        sendData={handleSubmitRequest}
      />
    </div>
  );
};

export default NewPassword;
