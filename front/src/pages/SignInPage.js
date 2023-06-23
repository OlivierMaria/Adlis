import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();
  const handleError = (errors) => {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleSignInSubmit = (data) => {
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
        if (error.response && error.response.data) {
          const { message } = error.response.data;
          setValue("serverResponse", message);
        }
      });
  };

  const signInOptions = {
    email: {
      required: "Email requis",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "l'adresse email n'est pas valide",
      },
    },
    password: {
      required: "Mot de passe Requis",
    },
  };

  return (
    <>
      <div className="container">
        <div className="form-container">
          <form onSubmit={handleSubmit(handleSignInSubmit, handleError)}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                {...register("email", signInOptions.email)}
                className="input"
              />
              <small className="text-danger">
                {errors?.email && errors.email.message}
              </small>
            </div>
            <div>
              <label htmlFor="password">Mot de passe:</label>
              <input
                type="password"
                name="password"
                {...register("password", signInOptions.password)}
                className="input"
              />
              <small className="text-danger">
                {errors?.password && errors.password.message}
              </small>
            </div>
            {errors.serverResponse && (
              <small className="text-danger">
                {errors.serverResponse.message}
              </small>
            )}
            <button type="submit" className="button">
              Se connecter
            </button>
          </form>
        </div>
        <div className="signp-link">
          <span>
            <h6>pas encore enregistré ?</h6>
            <Link to="/signup">Sign up</Link>
          </span>
          <span>
            <h6>mot de passe oublié ?</h6>
            <Link to="/resetpassword">Forgot password</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
