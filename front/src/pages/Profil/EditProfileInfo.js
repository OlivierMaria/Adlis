import React from "react";
import { useForm } from "react-hook-form";

const EditProfileForm = ({ field, onSave, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleSaveClick = (data) => {
    onSave(field, data.updatedValue, data.current_password);
  };

  const validationOptions = {
    username: {
      required: "Pseudo requis",
    },
    email: {
      required: "Email requis",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "L'adresse email n'est pas valide",
      },
    },
    email_confirmation: {
      validate: (value) =>
        value === watch("updatedValue") || "Les valeurs ne correspondent pas",
    },
    password: {
      required: "Mot de passe requis",
      minLength: {
        value: 12,
        message: "Le mot de passe doit comporter au moins 12 caractères",
      },
    },
    current_password: {
      required: "Mot de passe actuel requis",
      minLength: {
        value: 12,
        message: "Le mot de passe doit comporter au moins 12 caractères",
      },
    },
    password_confirmation: {
      validate: (value) =>
        value === watch("updatedValue") || "Les valeurs ne correspondent pas",
    },
  };

  return (
    <form
      className="edit-profile-form-container"
      onSubmit={handleSubmit(handleSaveClick)}
    >
      {field === "username" && (
        <>
          <label>Nouveau pseudo:</label>
          <input
            type="text"
            {...register("updatedValue", validationOptions.username)}
          />
          {errors.updatedValue && (
            <p className="error-message">{errors.updatedValue.message}</p>
          )}
        </>
      )}

      {field === "password" && (
        <>
          <label>Mot de passe actuel:</label>
          <input
            type="password"
            {...register(
              "current_password",
              validationOptions.current_password
            )}
          />
          {errors.current_password && (
            <p className="error-message">{errors.current_password.message}</p>
          )}

          <label>Nouveau mot de passe:</label>
          <input
            type="password"
            {...register("updatedValue", validationOptions.password)}
          />
          {errors.updatedValue && (
            <p className="error-message">{errors.updatedValue.message}</p>
          )}

          <label>Confirmer le nouveau mot de passe:</label>
          <input
            type="password"
            {...register(
              "password_confirmation",
              validationOptions.password_confirmation
            )}
          />
          {errors.password_confirmation && (
            <p className="error-message">
              {errors.password_confirmation.message}
            </p>
          )}
        </>
      )}

      {field === "email" && (
        <>
          <label>Nouvel email:</label>
          <input
            type="text"
            {...register("updatedValue", validationOptions.email)}
          />
          {errors.updatedValue && (
            <p className="error-message">{errors.updatedValue.message}</p>
          )}

          <label>Confirmer le nouvel email:</label>
          <input
            type="text"
            {...register(
              "email_confirmation",
              validationOptions.email_confirmation
            )}
          />
          {errors.email_confirmation && (
            <p className="error-message">{errors.email_confirmation.message}</p>
          )}
        </>
      )}

      <button type="submit">Enregistrer</button>
      <button onClick={onCancel}>Annuler</button>
    </form>
  );
};

export default EditProfileForm;
