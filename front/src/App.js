import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import Home from "./pages/Home.js";
import React from "react";
import NoPage from "./pages/NoPage.js";
import Books from "./pages/Books.js";
import Login from "./pages/Login.js";
import Footer from "./components/Footer.js";
import SignUp from "./pages/SignUp.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="books" element={<Books />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
