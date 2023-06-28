import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [avatar, setAvatar] = useState("");
  const userData = localStorage.getItem("userData");
  const userDataParse = JSON.parse(userData);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailConfirmChange = (event) => {
    setEmailConfirm(event.target.value);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    // Logique pour charger le nouvel avatar
    // Utilisez `file` pour traiter le fichier
  };

  const handleEditProfile = async () => {
    try {
      const url = `http://localhost:3000/registration/${userDataParse.session_id}`;
      const response = await axios.put(
        url,
        {
          username,
          password,
          password_confirmation: passwordConfirm,
          email,
          email_confirmation: emailConfirm,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Profil mis à jour avec succès:", response.data);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
    }
  };

  const handleDeleteAccount = () => {
    // Logique pour la suppression du compte
  };

  const fetchUserData = async () => {
    try {
      const url = `http://localhost:3000/sessions/${userDataParse.session_id}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsername(response.data.username);
    } catch (error) {
      localStorage.clear();
      navigate("/signin");
      console.error(
        "Erreur lors de la récupération des données utilisateur:",
        error
      );
    }
  };

  return (
    <div>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <br />
      <label>
        Password Confirm:
        <input
          type="password"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Email Confirm:
        <input
          type="email"
          value={emailConfirm}
          onChange={handleEmailConfirmChange}
        />
      </label>
      <br />
      <label>
        Avatar:
        <input type="file" onChange={handleAvatarChange} />
      </label>
      <br />
      <button onClick={handleEditProfile}>Edit Profile</button>
      <button onClick={handleDeleteAccount}>Delete Account</button>
      <div>
        <h2>{username}</h2>
        {avatar && <img src={avatar} alt="Avatar" />}
      </div>
    </div>
  );
};

export default Profil;
