import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//Falta que cuando se canjea el código se actulice la información

function Canjear() {
  const [recompensas, setRecompensas] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  const canjearRecompensa = (recompensa) => {
    fetch(`http://localhost:8080/api/clientes/${user.id}/reward/${recompensa.id}`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo canjear la recompensa");
        }
        // Si hay contenido, lo devolvemos, si no, seguimos sin procesar JSON
        return res.headers.get("Content-Length") === "0" ? null : res.json();
      })
      .then(() => {
        
        alert(
          "¡Recompensa canjeada correctamente!\nRevisa tu correo para obtener el código de canjeo."
        );
      })
      
  };
  
  

  useEffect(() => {
    fetch("http://localhost:8080/api/recompensas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las recompensas");
        }
        return response.json();
      })
      .then((data) => setRecompensas(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  if (!user) {
    return <p style={{ padding: "2rem" }}>No hay usuario. Vuelve al perfil.</p>;
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Segoe UI" }}>
      <h2>Canjeo de Recompensas</h2>
      <p>Aquí podrás canjear tus puntos por recompensas.</p>
      <p><strong>Tus puntos:</strong> {user.points}</p>

      <button
        onClick={() => navigate("/profile", { state: { user } })}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#34495e",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Volver al perfil
      </button>

      <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {recompensas.map((recompensa) => (
          <button
            key={recompensa.id}
            style={{
              padding: "1rem 2rem",
              borderRadius: "8px",
              border: "none",
              background: "#1f468f",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => canjearRecompensa(recompensa)}

          >
            {recompensa.name + " - Descripción: " + recompensa.description + " - Precio: " + recompensa.points + " puntos"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Canjear;
