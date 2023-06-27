import React from "react";
import { useForm } from "react-hook-form";

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
    paswwordPlaceholder,
    passwordConfirmationPlaceholder,
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
    <div className="form-container">
      <form
        className="form"
        onSubmit={handleSubmit(handleSubmitRequest, handleError)}
      >
        {username && (
          <>
            <label>{username}</label>
            <input
              type="text"
              placeholder={usernamePlaceholder}
              {...register("username", validOptions.username)}
            />
            <small className="text-danger">
              {errors?.username && errors.username.message}
            </small>
          </>
        )}

        {email && (
          <>
            <label>{email}</label>
            <input
              type="email"
              placeholder={emailPlaceholder}
              {...register("email", validOptions.email)}
            />
            <small className="text-danger">
              {errors?.email && errors.email.message}
            </small>
          </>
        )}

        {password && (
          <>
            <label>{password}</label>
            <input
              type="password"
              placeholder={paswwordPlaceholder}
              {...register("password", validOptions.password)}
            />
            <small className="text-danger">
              {errors?.password && errors.password.message}
            </small>
          </>
        )}
        {passwordConfirmation && (
          <>
            <label>{passwordConfirmation}</label>
            <input
              type="password"
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
          </>
        )}
        {Conditions && (
          <>
            <label htmlFor="accept_conditions">{Conditions}</label>
            <input
              type="checkbox"
              id="accept_conditions"
              {...register("accept_conditions", validOptions.accept_conditions)}
            />

            <small className="text-danger">
              {errors?.accept_conditions && errors.accept_conditions.message}
            </small>
          </>
        )}
        {button && (
          <>
            <button>{button}</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Form;
