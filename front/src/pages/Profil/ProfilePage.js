import React, { useState, useEffect } from "react";
import ProfileRequest from "./ProfileRequest";
import DisplayProfileInfo from "./DisplayProfilInfo";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const data = await ProfileRequest.fetchProfileData();
      setProfileData(data);
    } catch (error) {
      localStorage.clear();
      setProfileData(null);
      navigate("/");
      console.error(
        "Erreur lors de la récupération des données du profil :",
        error
      );
    }
  };
  const handleEdit = async (field, updatedValue, currentPassword) => {
    try {
      switch (field) {
        case "username":
          await ProfileRequest.updateUsername(updatedValue);
          break;
        case "email":
          await ProfileRequest.updateEmail(updatedValue);
          break;
        case "password":
          await ProfileRequest.updatePassword(currentPassword, updatedValue);
          break;
        default:
          break;
      }
      fetchProfileData();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  };

  if (!profileData) {
    return <div>Chargement des données du profil...</div>;
  }

  return (
    <div className="profile-page">
      <h1>Page de profil</h1>
      <div className="profile-info">
        <DisplayProfileInfo profileData={profileData} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default ProfilePage;
