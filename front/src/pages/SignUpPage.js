import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
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
    <>
      <div className="container">
        <div>
          <form onSubmit={signUpRequest} className="form-container">
            <label className="label" htmlFor="username">
              Pseudo :
            </label>
            <input
              type="text"
              id="username"
              value={userData.username}
              name="username"
              onChange={handleChange}
              className="input"
            />
            <label className="label" htmlFor="email">
              Email :
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="input"
            />
            <label className="label" htmlFor="password">
              Mot de passe :
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="input"
            />
            <label className="label" htmlFor="password_confirmation">
              Confirmation du Mot de passe :
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              value={userData.password_confirmation}
              onChange={handleChange}
              className="input"
            />
            <button type="submit" className="button">
              Inscription
            </button>
          </form>
        </div>
        <div className="signin-link">
          <span>
            <h6>déjà enregistré ?</h6>
            <Link to="/signup">Sign in</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
