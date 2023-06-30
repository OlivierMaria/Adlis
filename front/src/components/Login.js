import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    axios
      .post("https://adlis-077af6a0b065.herokuapp.com/sign_in", {
        email: email,
        password: password,
      })
      .then((res) => {
        const { username, user_id, session_id } = res.data;

        // localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user_id", JSON.stringify(user_id));
        localStorage.setItem("username", JSON.stringify(username));
        localStorage.setItem("session_id", JSON.stringify(session_id));

        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          max="40"
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Mot de passe:</label>
        <input
          max="40"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;
