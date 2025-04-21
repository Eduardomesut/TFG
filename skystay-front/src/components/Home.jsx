import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "/imagen2sky.jpg",
  "/skystay1.png",
  "/vegasimagen3.jpg"
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

      <style jsx>{`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  .home-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: linear-gradient(to right, #a7c7f4, #9ad1eb);
  }

  .carousel {
    width: 100%;
    height: 60vh; /* Tamaño fijo para todas las imágenes */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e0eefe;
    overflow: hidden;
  }

  .carousel img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Escala proporcional */
    transition: opacity 0.5s ease-in-out;
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 40px;
    padding: 30px 0;
    background-color: rgba(255, 255, 255, 0.3);
  }

  .buttons button {
    padding: 14px 36px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    background-color: #3182ce;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .buttons button:hover {
    background-color: #2b6cb0;
    transform: scale(1.05);
  }

  .buttons button:focus {
    outline: 3px solid #63b3ed;
    outline-offset: 3px;
  }
`}</style>
    </div>
  );
}

export default Home;
