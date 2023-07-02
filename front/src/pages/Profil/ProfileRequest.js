import axios from "axios";

const ProfileRequest = {
  // Deletes the user's account
  deleteAccount: async () => {
    try {
      const confirmDelete = window.confirm(
        "Voulez-vous vraiment supprimer votre compte ?"
      );
      if (confirmDelete) {
        const userDataItems = localStorage.getItem("userData");
        const userData = JSON.parse(userDataItems);
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/users/${userData.user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Compte utilisateur supprimé avec succès");
        localStorage.clear();
      } else {
        // Ne rien faire ici
      }
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du compte utilisateur :",
        error
      );
      throw error;
    }
  },

  // Fetches the profile data from the server
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
      console.error("Error fetching profile data:", error);
      throw error;
    }
  },

  // Updates the user's password
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
      alert("Mise à jour réussie, vous devriez vous reconnecter");
      localStorage.clear();
    } catch (error) {
      alert("Le mot de passe actuel n'est pas valide");
      throw error;
    }
  },

  // Updates the user's email
  updateEmail: async (newEmail) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/identity/email`,
        {
          email: newEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("L'adresse e-mail est mise a jour");
    } catch (error) {
      alert("L'adresse e-mail est déjà utilisée");
      console.error("Error updating email:", error);
      throw error;
    }
  },

  // Updates the user's username
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
      console.log("Username updated successfully");
      alert("Nom d'utilisateur mis à jour avec succès");
    } catch (error) {
      alert(error);
      console.error("Error updating username:", error);
      throw error;
    }
  },
};

export default ProfileRequest;
