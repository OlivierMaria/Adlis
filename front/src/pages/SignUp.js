import axios from "axios";
import React, { useState } from "react";

const SignUp = () => {
  const Identifiants = {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const [userData, setUserData] = useState(Identifiants);

  const signUpRequest = () => {
    axios({
      url: "http://localhost:3000/sign_up",
      method: "post",
      data: userData,
    })
      .then((res) => {
        if (res.status === 200) {
          const { token, user } = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user_id", JSON.stringify(user));
          localStorage.setItem("session_id", JSON.stringify(user));
          console.log(token);
        }
      })
      .catch((error) => {
        console.log(error.response.status);
      });
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    e.preventDefault();
  };

  return (
    <div>
      <form>
        <label htmlFor="username">Pseudo</label>
        <input
          type="text"
          id="username"
          value={userData.username}
          name="username"
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <label htmlFor="password_confirmation">
          Confirmation du Mot de passe
        </label>
        <input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          value={userData.password_confirmation}
          onChange={handleChange}
        />
        <button onClick={signUpRequest}>Inscription</button>
      </form>
    </div>
  );
};

export default SignUp;
