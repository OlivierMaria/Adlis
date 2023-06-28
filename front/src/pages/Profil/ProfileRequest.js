import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileRequest = {
  fetchProfileData: async () => {
    try {
      const userDataItems = localStorage.getItem("userData");
      const userData = JSON.parse(userDataItems);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/sessions/${userData.session_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données du profil :",
        error
      );
      throw error;
    }
  },

  updatePassword: async (currentPassword, newPassword) => {
    try {
      const token = localStorage.getItem("token");
      console.log(" current" + currentPassword + " updated", newPassword);
      await axios.put(
        `http://localhost:3000/password`,
        {
          current_password: currentPassword,
          password: newPassword,
          password_confirmation: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Mot de passe mis à jour avec succès");
      alert("mise a jour avec succes, vous devriez vous reconneceter");
      localStorage.clear();
    } catch (error) {
      alert("mot de passe actuel n'est pas valid");
      throw error;
    }
  },

  updateEmail: async (newEmail) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000//identity/email`,
        {
          email: newEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Email mis à jour avec succès");
    } catch (error) {
      alert("adresse mail déja utilisée");
      console.error("Erreur lors de la mise à jour de l'email :", error);
      throw error;
    }
  },

  updateUsername: async (newUsername) => {
    try {
      const userDataItems = localStorage.getItem("userData");
      const userData = JSON.parse(userDataItems);
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/users/${userData.user_id}`,
        { username: newUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Nom d'utilisateur mis à jour avec succès");
      alert("Nom d'utilisateur mis à jour avec succès");
    } catch (error) {
      alert(error);
      console.error(
        "Erreur lors de la mise à jour du nom d'utilisateur :",
        error
      );
      throw error;
    }
  },
};

export default ProfileRequest;
