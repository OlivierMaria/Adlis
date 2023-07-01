import React from "react";
import { useForm } from "react-hook-form";
import "../style/Form.css";
import { Link } from "react-router-dom";

const Form = (props) => {
  const handleError = (errors) => {};
  const {
    username,
    email,
    password,
    passwordConfirmation,
    Conditions,
    button,
    usernamePlaceholder,
    emailPlaceholder,
    passwordConfirmationPlaceholder,
    page,
  } = props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleSubmitRequest = (data) => {
    props.sendData(data);
  };

  const validOptions = {
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
      <div className="container-test">
        <div className="form-container">
          <form
            className="form"
            onSubmit={handleSubmit(handleSubmitRequest, handleError)}
          >
            {username && (
              <div className="form-group">
                <label htmlFor="username">{username}</label>
                <input
                  type="text"
                  id="username"
                  min="3"
                  max="40"
                  placeholder={usernamePlaceholder}
                  {...register("username", validOptions.username)}
                />
                <small className="text-danger">
                  {errors?.username && errors.username.message}
                </small>
              </div>
            )}

            {email && (
              <div className="form-group">
                <label htmlFor="email">{email}</label>
                <input
                  max="40"
                  type="email"
                  id="email"
                  placeholder={emailPlaceholder}
                  {...register("email", validOptions.email)}
                />
                <small className="text-danger">
                  {errors?.email && errors.email.message}
                </small>
              </div>
            )}

            {password && (
              <div className="form-group">
                <label htmlFor="password">{password}</label>
                <input
                  max="40"
                  type="password"
                  id="password"
                  {...register("password", validOptions.password)}
                />

                {page === "signin" && errors.password && (
                  <>
                    {errors.password.type === "required" && (
                      <small className="text-danger">mot de passe requis</small>
                    )}
                  </>
                )}
              </div>
            )}

            {passwordConfirmation && (
              <div className="form-group">
                <label htmlFor="passwordConfirmation">
                  {passwordConfirmation}
                </label>
                <input
                  type="password"
                  max="40"
                  id="passwordConfirmation"
                  placeholder={passwordConfirmationPlaceholder}
                  {...register(
                    "password_confirmation",
                    validOptions.password_confirmation
                  )}
                />
                <small className="text-danger">
                  {errors?.password_confirmation &&
                    errors.password_confirmation.message}
                </small>
              </div>
            )}

            {Conditions && (
              <div className="form-group">
                <input
                  type="checkbox"
                  max="40"
                  id="accept_conditions"
                  {...register(
                    "accept_conditions",
                    validOptions.accept_conditions
                  )}
                />
                <label htmlFor="accept_conditions">{Conditions}</label>
                <small className="text-danger">
                  {errors?.accept_conditions &&
                    errors.accept_conditions.message}
                </small>
              </div>
            )}

            {button && (
              <div className="form-group">
                <button type="submit" className="submit-button">
                  {button}
                </button>
              </div>
            )}
          </form>
          {page === "signin" && (
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
          )}

          {page === "signup" && (
            <>
              <h6>déjà enregistré ?</h6>
              <Link to="/signin">Sign in</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
