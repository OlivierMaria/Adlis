import React, { useState } from "react";
import EditProfileForm from "./EditProfileInfo";

const DisplayProfileInfo = ({ profileData, onEdit }) => {
  const [activeField, setActiveField] = useState(null);

  // Handle the edit field click event
  const handleEditField = (field) => {
    setActiveField(field);
  };

  // Handle the cancel edit event
  const handleCancelEdit = () => {
    setActiveField(null);
  };

  // Handle the save edit event
  const handleSaveEdit = (field, updatedValue, currentPassword) => {
    onEdit(field, updatedValue, currentPassword);
    setActiveField(null);
  };

  return (
    <div>
      <h2>Informations du profil</h2>
      <p>
        <strong>Nom d'utilisateur:</strong> {profileData.username}
        {activeField !== "username" && (
          <button onClick={() => handleEditField("username")}>Modifier</button>
        )}
        {activeField === "username" && (
          <EditProfileForm
            field="username"
            defaultValue={profileData.username}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        )}
      </p>
      <p>
        <strong>Email:</strong> {profileData.email}
        {activeField !== "email" && (
          <button onClick={() => handleEditField("email")}>Modifier</button>
        )}
        {activeField === "email" && (
          <EditProfileForm
            field="email"
            defaultValue={profileData.email}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        )}
      </p>
      <p>
        <strong>Mot de passe:</strong>
        {activeField !== "password" && (
          <button onClick={() => handleEditField("password")}>Modifier</button>
        )}
        {activeField === "password" && (
          <EditProfileForm
            field="password"
            defaultValue="*************"
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
            requireCurrentPassword
          />
        )}
      </p>
    </div>
  );
};

export default DisplayProfileInfo;
