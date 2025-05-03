import React, { useEffect, useState } from "react";

function Canjear() {
  const [recompensas, setRecompensas] = useState([]);

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

  return (
    <div style={{ padding: "2rem", fontFamily: "Segoe UI" }}>
      <h2>Canjeo de Recompensas</h2>
      <p>Aquí podrás canjear tus puntos por recompensas.</p>
      
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
            onClick={() => alert(`Seleccionaste: ${recompensa.name}`)}
          >
            {recompensa.name + " - Descripción: " + recompensa.description + " - Precio: " + recompensa.points + " puntos"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Canjear;
