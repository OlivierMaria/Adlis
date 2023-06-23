import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const handleError = (errors) => {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleSignUpSubmit = (dataSignUp) => {
    signUpRequest(dataSignUp);
  };

  const signUpRequest = (dataSignUp) => {
    axios
      .post("http://localhost:3000/sign_up", dataSignUp)
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
  const signUpOptions = {
    username: { required: "pseudo requis" },
    email: {
      required: "Email requis",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "l'adresse email n'est pas valide",
      },
    },
    password: {
      required: "mot de passe requis",
      minLength: {
        value: 12,
        message: "mot de passe doit avoir minimum 12 caracteres",
      },
    },
    password_confirmation: {
      validate: (value) =>
        value === watch("password") || "Les mots de passe ne correspondent pas",
    },
    accept_conditions: {
      required: "Veuillez accepter les conditions d'utilisation",
    },
  };

  return (
    <>
      <div className="container">
        <div>
          <form
            className="form-container"
            onSubmit={handleSubmit(handleSignUpSubmit, handleError)}
          >
            <div>
              <label className="label" htmlFor="username">
                Pseudo :
              </label>
              <input
                type="text"
                id="username"
                {...register("username", signUpOptions.username)}
                className="input"
              />
              <small className="text-danger">
                {errors?.username && errors.username.message}
              </small>
            </div>
            <label className="label" htmlFor="email">
              Email :
            </label>
            <div>
              <input
                type="text"
                id="email"
                name="email"
                {...register("email", signUpOptions.email)}
                className="input"
              />
              <small className="text-danger">
                {errors?.email && errors.email.message}
              </small>
            </div>
            <div>
              <label className="label" htmlFor="password">
                Mot de passe :
              </label>
              <input
                type="password"
                id="password"
                name="password"
                {...register("password", signUpOptions.password)}
                className="input"
              />
              <small className="text-danger">
                {errors?.password && errors.password.message}
              </small>
            </div>
            <div>
              <label className="label" htmlFor="password_confirmation">
                Confirmation du Mot de passe :
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                {...register(
                  "password_confirmation",
                  signUpOptions.password_confirmation
                )}
                className="input"
              />
              <small className="text-danger">
                {errors?.password_confirmation &&
                  errors.password_confirmation.message}
              </small>
            </div>
            <div>
              <label className="label" htmlFor="accept_conditions">
                J'accepte les conditions d'utilisation :
              </label>
              <input
                type="checkbox"
                id="accept_conditions"
                {...register(
                  "accept_conditions",
                  signUpOptions.accept_conditions
                )}
              />
              <small className="text-danger">
                {errors?.accept_conditions && errors.accept_conditions.message}
              </small>
            </div>
            <button type="submit" className="button">
              Inscription
            </button>
          </form>
        </div>
        <div className="signin-link">
          <span>
            <h6>déjà enregistré ?</h6>
            <Link to="/signin">Sign in</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
