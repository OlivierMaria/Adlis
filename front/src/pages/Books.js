import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.js";

const Books = () => {
  const { id } = useParams();

  // Utilisez l'ID pour récupérer les détails du livre de votre API ou de votre source de données
  // par exemple, vous pouvez effectuer une requête pour obtenir les détails du livre en utilisant l'ID

  return (
    <div>
      <Navbar />
      <h1>Books</h1>
      <p>Mes livres préférée sont : </p>
    </div>
  );
};

export default Books;
