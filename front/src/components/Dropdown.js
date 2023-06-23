import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Dropdown = () => {
  const parseUserData = localStorage.getItem("token");
  const currentUser = parseUserData;

  const navigate = useNavigate();
  const userDataitems = localStorage.getItem("userData");
  const userData = JSON.parse(userDataitems);
  const token = localStorage.getItem("token");

  const logOutRequest = () => {
    axios
      .delete(`http://127.0.0.1:3000/sessions/${userData.session_id}`, {
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
            <Link to="/profil">Profil</Link>
            <button onClick={logOutRequest}>Deconnexion</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
