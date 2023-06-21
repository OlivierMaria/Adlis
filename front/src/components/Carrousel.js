import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/fall-animation.css";
import "../style/Carrousel.css";
import img1 from "../assets/img/image1.jpg";
import img2 from "../assets/img/image2.jpg";
import img3 from "../assets/img/image3.jpg";

const images = [img1, img2, img3];

const Carrousel = () => (
  <div className="carousel-container">
    <AwesomeSlider
      className="slider"
      bullets={false}
      organicArrows={true}
      animation="fallAnimation"
    >
      {images.map((image, index) => (
        <div key={index} data-src={image} />
      ))}
    </AwesomeSlider>
  </div>
);

export default Carrousel;
