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

// import LoginPage from "./pages/LoginPage.js";
import SignInPage from "./pages/SignInPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import ResetPassword from "./pages/reset_password/ResetPasword.js";

import Navbar from "./components/Navbar.js";

import BookCategory from "./pages/BookCategory.js";
import "./App.css";
import NewPassword from "./pages/reset_password/NewPassword.js";
import ProfilePage from "./pages/Profil/ProfilePage.js";

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
        <Route path="books/:id" element={<BookPage />} />
        {currentUser === null ? (
          <>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/resetpassword/:edit" element={<NewPassword />} />
            <Route path="/signin" element={<SignInPage />} />
          </>
        ) : (
          <Route path="/profile" element={<ProfilePage />} />
        )}

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
