import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const currentSession = localStorage.getItem("session_id");

  const logOutRequest = () => {
    axios
      .delete(`http://127.0.0.1:3000/sessions/${currentSession}`, {
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
    <div>
      <button onClick={logOutRequest}>deconnexion</button>
    </div>
  );
};

export default LogOut;
