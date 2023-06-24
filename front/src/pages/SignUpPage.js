import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSubmitRequest = (data) => {
    signUpRequest(data);
  };

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
            email: res.data.email,
          })
        );

        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Form
        username="Pseudo"
        email="Adresse Email"
        password="Mot de passe"
        passwordConfirmation="confirmation mot de passe"
        Conditions="conditions generales "
        button="s'inscrire"
        handleSubmitRequest={handleSubmitRequest}
      />
      <h6>déjà enregistré ?</h6>
      <Link to="/signin">Sign in</Link>
    </>
  );
};

export default SignUpPage;
