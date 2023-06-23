import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Récupérer les données de l'utilisateur depuis le stockage local 
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    } else {
      // Rediriger l'utilisateur vers la page d'inscription s'il n'y a pas de données d'utilisateur
     
      window.location.href = "/Profil.js";
    }
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h2>Profil de {userData.username}</h2>
          <p>ID utilisateur : {userData.user_id}</p>
          <p>ID de session : {userData.session_id}</p>
          <p>Mail de l'utilisateur : {userData.user_email}</p>
        </div>
      ) : (
        <p>Chargement du profil...</p>
      )}
    </div>
  );
};

export default Profile;
