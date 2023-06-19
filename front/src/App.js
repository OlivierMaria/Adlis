import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import Home from "./pages/Home.js";
import React from "react";
import Navbar from "./components/Navbar.js";
import NoPage from "./pages/NoPage.js";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
