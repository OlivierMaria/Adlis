import React, { useState, useEffect, useCallback } from "react";
import ProfileRequest from "./ProfileRequest";
import DisplayProfileInfo from "./DisplayProfilInfo";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  // Fetches the profile data from the server
  const fetchProfileData = useCallback(async () => {
    try {
      const data = await ProfileRequest.fetchProfileData();
      setProfileData(data);
    } catch (error) {
      localStorage.clear();
      setProfileData(null);
      navigate("/");
      console.error("Error fetching profile data:", error);
    }
  }, [navigate]);

  // Deletes the user's account
  const deleteProfileData = useCallback(async () => {
    try {
      await ProfileRequest.deleteAccount();
      localStorage.clear();
      setProfileData(null);
      navigate("/");
    } catch (error) {
      localStorage.clear();
      setProfileData(null);
      navigate("/");
      console.error("Error deleting profile data:", error);
    }
  }, [navigate]);

  // Handles the editing of profile fields
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
        console.error("Error updating profile:", error);
      }
    },
    [fetchProfileData]
  );

  // Fetches the profile data on component mount
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
        Supprimer mon compte
      </button>
    </div>
  );
};

export default ProfilePage;
