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

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:3000/sign_in", {
        email: email,
        password: password,
      })
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
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
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
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button action="submit">Se connecter</button>
    </form>
  );
};

export default Login;
