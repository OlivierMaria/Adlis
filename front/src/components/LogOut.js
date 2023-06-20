import axios from "axios";
import React from "react";

const LogOut = () => {
  let token = "";
  const logOutRequest = () => {
    axios
      .delete("http://127.0.0.1:3000/sessions/10", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 201) {
          token = "";
        }
      })
      .catch((error) => {
        console.log(error.response.status);
      });
  };

  return (
    <div>
      <button onClick={logOutRequest}>deconnexion</button>
    </div>
  );
};

export default LogOut;
