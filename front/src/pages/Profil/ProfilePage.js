import React, { useState, useEffect, useCallback } from "react";
import ProfileRequest from "./ProfileRequest";
import DisplayProfileInfo from "./DisplayProfilInfo";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  const fetchProfileData = useCallback(async () => {
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
  }, [navigate]);

  const deleteProfileData = useCallback(async () => {
    try {
      const data = await ProfileRequest.deleteAccount();
      setProfileData(data);
      localStorage.clear();
      setProfileData(null);
      navigate("/");
    } catch (error) {
      localStorage.clear();
      setProfileData(null);
      navigate("/");
      console.error(
        "Erreur lors de la récupération des données du profil :",
        error
      );
    }
  }, [navigate]);

  const handleEdit = useCallback(
    async (field, updatedValue, currentPassword) => {
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
    },
    [fetchProfileData]
  );

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  if (!profileData) {
    return <div>Chargement des données du profil...</div>;
  }

  return (
    <div className="card">
      <h1 className="card__title">Votre profil</h1>
      <div className="card__content">
        <DisplayProfileInfo profileData={profileData} onEdit={handleEdit} />
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        onClick={deleteProfileData}
      >
        supprimer mon compte
      </button>
    </div>
  );
};

export default ProfilePage;
