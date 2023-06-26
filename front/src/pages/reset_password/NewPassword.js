import React from "react";
import Form from "../../components/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewPassword = () => {
  const navigate = useNavigate();

  const handleSubmitRequest = (data) => {
    handleNewPassword(data);
  };
  const handleNewPassword = (data) => {
    axios
      .patch("http://127.0.0.1:3000/identity/password_reset", data)
      .then((res) => {
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
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
