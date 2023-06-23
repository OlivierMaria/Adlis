import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import Home from "./pages/Home.js";
import React from "react";
// import NoPage from "./pages/NoPage.js";
import Books from "./pages/Books.js";
// import Footer from "./components/Footer.js";
import SignUp from "./pages/SignUp.js";
import BookPage from "./pages/BookPage.js";
import LoginPage from "./pages/LoginPage.js";
import Profil from "./pages/Profil.js";

const App = () => {
  const book = {
    title: "Example Book",
    imageLinks: {
      smallThumbnail: "https://example.com/book-thumbnail.jpg",
    },
  };
  const parseUserData = localStorage.getItem("token");
  const currentUser = parseUserData;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="books" element={<Books />} />
        <Route path="books/:title" element={<BookPage book={book} />} />
        <Route path="profil" element={<Profil />} />
        {currentUser === null ? (
          <>
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LoginPage />} />
          </>
        ) : null}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
