import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // para el estilo

const images = [
  "/skystay1.png",
  "/skystay1.png",
  "/skystay1.png"
];

function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className="carousel">
        <img src={images[currentImage]} alt="carousel" />
      </div>
      <div className="buttons">
        <button onClick={() => navigate("/login")}>Iniciar Sesión</button>
        <button onClick={() => navigate("/register")}>Registrarse</button>
      </div>
    </div>
  );
}

export default Home;
