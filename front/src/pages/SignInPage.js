import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";

const SignInPage = () => {
  const navigate = useNavigate();

  const handleSubmitRequest = (data) => {
    handleSignIn(data);
  };

  const handleSignIn = (data) => {
    axios
      .post("http://127.0.0.1:3000/sign_in", data)
      .then((res) => {
        if (res.status === 201) {
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
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Form
        email="Adresse Email"
        password="Mot de passe"
        button="se connecter"
        sendData={handleSubmitRequest}
        page="signin"
      />
    </>
  );
};

export default SignInPage;
