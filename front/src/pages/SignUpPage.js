import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

const SignUpPage = () => {
  const navigate = useNavigate();

  // Handles the form submission
  const handleSubmitRequest = (data) => {
    signUpRequest(data);
  };

  // Sends sign-up request to the server
  const signUpRequest = (data) => {
    axios
      .post("http://localhost:3000/sign_up", data)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);

        localStorage.setItem(
          "userData",
          JSON.stringify({
            user_id: res.data.user_id,
            username: res.data.username,
            session_id: res.data.session_id,
          })
        );

        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          // Display an alert for 422 Unprocessable Entity error
          alert("Email déjà utilisé.");
        } else {
          // Display a generic error alert for other errors
          alert(
            "Une erreur s'est produite. Veuillez réessayer ultérieurement."
          );
        }
        console.error(error);
      });
  };

  return (
    <>
      <Form
        username="Pseudo"
        email="Adresse Email"
        password="Mot de passe"
        passwordConfirmation="Confirmer le mot de passe"
        Conditions="Conditions générales"
        button="S'inscrire"
        sendData={handleSubmitRequest}
        page="signup"
      />
    </>
  );
};

export default SignUpPage;
