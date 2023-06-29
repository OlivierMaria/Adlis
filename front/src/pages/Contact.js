import React from "react";
import "../style/Contact.css";
import Footer from "../components/Footer";
import Contactmp4 from "../assets/video/contact.mp4";

const Contact = () => {
  return (
    <>
      <div className="flex">
        <div className="form-container">
          <form
            className="max-w-md mx-auto"
            action="https://getform.io/f/b1134f77-cc6e-42bf-89a4-376bbbf20da8"
            method="POST"
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label htmlFor="name">Prénom</label>
              <input type="text" id="name" name="name" placeholder="Name" />
            </div>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Email" />
            </div>
            <div className="mb-4">
              <label htmlFor="subject">Sujet</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                cols="30"
                rows="10"
                placeholder="Message"
              ></textarea>
            </div>
            <button type="submit">Envoyer</button>
          </form>
        </div>
        <div className="about-video-container">
          <video className="about-video" autoPlay loop muted>
            <source src={Contactmp4} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
