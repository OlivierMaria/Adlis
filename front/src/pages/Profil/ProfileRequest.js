import axios from "axios";

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

  updatePassword: async (newPassword, currentPassword) => {
    try {
      const token = localStorage.getItem("token");
      console.log(currentPassword + " updated", newPassword);
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
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe :", error);
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
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du nom d'utilisateur :",
        error
      );
      throw error;
    }
  },
};

export default ProfileRequest;
