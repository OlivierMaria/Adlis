import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Dropdown = () => {
  const navigate = useNavigate();
  const userDataitems = localStorage.getItem("userData");
  const userData = JSON.parse(userDataitems);
  const token = localStorage.getItem("token");
  const currentUser = userData;

  const logOutRequest = () => {
    axios
      .delete(
        `https://adlis-077af6a0b065.herokuapp.com/sessions/${userData.session_id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
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
      <button>Mon profil</button>
      <div className="dropdown-options">
        {currentUser === null ? (
          <>
            <Link to="/signin">Connexion</Link>
            <Link to="/signup">Inscription</Link>
          </>
        ) : (
          <>
            <Link to="/profile">Profil</Link>
            <button onClick={logOutRequest}>Deconnexion</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
