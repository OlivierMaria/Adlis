import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import Home from "./pages/Home.js";
import React from "react";
import Books from "./pages/Books.js";
import BookPage from "./pages/BookPage.js";
import SignInPage from "./pages/SignInPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import ResetPassword from "./pages/reset_password/ResetPasword.js";
import Navbar from "./components/Navbar.js";
import BookCategory from "./pages/BookCategory.js";
import "./App.css";
import NewPassword from "./pages/reset_password/NewPassword.js";
import ProfilePage from "./pages/Profil/ProfilePage.js";
import Rgpd from "./pages/Rgpd.js";
import MailConfirmed from "./pages/MailConfirmed.js";
import Footer from "./components/Footer.js";

const App = () => {
  const parseUserData = localStorage.getItem("token");
  const currentUser = parseUserData;

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/list/:category" element={<BookCategory />} />
        <Route path="books/:id" element={<BookPage />} />
        <Route path="rgpd" element={<Rgpd />} />
        {currentUser === null ? (
          <>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/resetpassword/:edit" element={<NewPassword />} />
            <Route path="/signin" element={<SignInPage />} />
          </>
        ) : (
          <>
            <Route path="books" element={<Books />} />
            <Route path="/profile" element={<ProfilePage />} />
          </>
        )}

        <Route path="*" element={<Home />} />
        <Route path="confirmed" element={<MailConfirmed />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
