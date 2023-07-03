import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dropdown = () => {
  const navigate = useNavigate();
  const userDataitems = localStorage.getItem("userData");
  const userData = JSON.parse(userDataitems);
  const token = localStorage.getItem("token");
  const currentUser = userData;
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Send logout request and clear local storage
  const logOutRequest = () => {
    axios
      .delete(`http://localhost:3001/${userData.session_id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.clear();
          return navigate("/");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.clear();
          navigate("/");
        } else {
          console.log(error.response.status);
        }
      });
  };

  return (
    <div className="dropdown">
      <button className="button-primary" onClick={toggleDropdown}>
        Mon profil
      </button>
      <div className={`dropdown-options ${isOpen ? "open" : ""}`}>
        {currentUser === null ? (
          <>
            <Link to="/signin">Connexion</Link>
            <Link to="/signup">Inscription</Link>
          </>
        ) : (
          <>
            <Link to="/profile">Profil</Link>
            <button onClick={logOutRequest}>Déconnexion</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
