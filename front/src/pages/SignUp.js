import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const Identifiants = {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const [userData, setUserData] = useState(Identifiants);

  const signUpRequest = (e) => {
    e.preventDefault();
    console.log(userData);
    axios
      .post("http://localhost:3000/sign_up", userData)
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
        console.error(error);
      });
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={signUpRequest}>
        <label htmlFor="username">Pseudo :</label>
        <input
          type="text"
          id="username"
          value={userData.username}
          name="username"
          onChange={handleChange}
        />
        <label htmlFor="email">Email :</label>
        <input
          type="text"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <label htmlFor="password_confirmation">
          Confirmation du Mot de passe :
        </label>
        <input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          value={userData.password_confirmation}
          onChange={handleChange}
        />
        <button action="submit">Inscription </button>
      </form>
    </div>
  );
};

export default SignUp;
