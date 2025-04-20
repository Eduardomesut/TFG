import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

      {/* CSS in the same file */}
      <style jsx>{`
        /* Contenedor principal */
        .home-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          flex-direction: column;
          background: linear-gradient(to right, #a7c7f4, #9ad1eb);
          padding: 20px;
        }

        /* Estilo del carrusel */
        .carousel {
          width: 100%;
          max-width: 600px;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 30px;
        }

        .carousel img {
          width: 100%;
          height: auto;
          object-fit: cover;
          transition: transform 0.5s ease-in-out;
        }

        /* Estilo de los botones */
        .buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .buttons button {
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 600;
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
          outline: 4px solid #63b3ed;
          outline-offset: 4px;
        }
      `}</style>
    </div>
  );
}

export default Home;
