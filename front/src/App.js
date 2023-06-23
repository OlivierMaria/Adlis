import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import Home from "./pages/Home.js";
import React from "react";
// import NoPage from "./pages/NoPage.js";
import Books from "./pages/Books.js";
// import Footer from "./components/Footer.js";
// import SignUp from "./pages/SignUp.js";
import BookPage from "./pages/BookPage.js";

import Profil from "./pages/Profil.js";
// import LoginPage from "./pages/LoginPage.js";
import SignInPage from "./pages/SignInPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import ResetPassword from "./components/ResetPasword.js";

import Navbar from "./components/Navbar.js";

import BookCategory from "./pages/BookCategory.js";

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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="books" element={<Books />} />
        <Route path="/list/:category" element={<BookCategory />} />
        <Route path="books/:title" element={<BookPage book={book} />} />
        <Route path="profil" element={<Profil />} />
        {currentUser === null ? (
          <>
            <Route path="signup" element={<SignUpPage />} />
            <Route path="resetpassword" element={<ResetPassword />} />
            <Route path="signin" element={<SignInPage />} />
          </>
        ) : null}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
