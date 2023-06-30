import React from "react";
import Form from "../../components/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewPassword = () => {
  const navigate = useNavigate();
  const handleSubmitRequest = (data) => {
    handlePasswordReset(data);
  };
  const handlePasswordReset = (data) => {
    const token = new URLSearchParams(window.location.search).get("sid");
    data.sid = token;
    axios
      .patch(`http://127.0.0.1:3000/identity/password_reset`, data)
      .then((response) => {
        alert("Le mot de passe a été mis à jour avec succès");
        navigate("/signin");
      })
      .catch((error) => {
        alert("erreur lors de la mise a jour du mot de passe");
      });
  };

  return (
    <div>
      <Form
        password="nouveau mot passe"
        passwordConfirmation="confirmation nouveau mot de passe"
        button="modifier mon mot de passe"
        sendData={handleSubmitRequest}
      />
    </div>
  );
};

export default NewPassword;
