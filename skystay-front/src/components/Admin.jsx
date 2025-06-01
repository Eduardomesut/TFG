// src/components/Admin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin({ admin, setAdmin }) {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState([]);

  const [recompensa, setRecompensa] = useState({ name: "", description: "", points: "", Stock: "" });
  const [mensajeRecompensa, setMensajeRecompensa] = useState("");
  const [mostrarFormularioRecompensa, setMostrarFormularioRecompensa] = useState(false);

  useEffect(() => {
    axios.get("https://tfg-5ljt.onrender.com/api/clientes")
      .then((response) => {
        setClientes(response.data);
        setClientesFiltrados(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los clientes:", error);
      });
  }, []);

  const handleBuscar = () => {
    const resultado = clientes.filter(cliente =>
      cliente.name.toLowerCase().startsWith(filtro.toLowerCase())
    );
    setClientesFiltrados(resultado);
  };

  const handleCrearRecompensa = () => {
    axios.post("https://tfg-5ljt.onrender.com/api/crearRecompensa", recompensa)
      .then((res) => {
        setMensajeRecompensa("Recompensa creada con éxito.");
        setRecompensa({ name: "", description: "", points: "", Stock: "" });
      })
      .catch((err) => {
        console.error("Error al crear la recompensa:", err);
        setMensajeRecompensa("Error al crear la recompensa.");
      });
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#4b0082", color: "#fff", minHeight: "100vh" }}>
      <h1>Panel de Administración</h1>
      <h2>Lista de Clientes Registrados</h2>

      {/* Buscador */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{ padding: "8px", width: "200px", marginRight: "10px" }}
        />
        <button onClick={handleBuscar} style={{ padding: "8px 16px" }}>Buscar</button>
      </div>

      {/* Botón para mostrar formulario de recompensa */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setMostrarFormularioRecompensa(!mostrarFormularioRecompensa)} style={{ padding: "8px 16px", marginRight: "10px" }}>
          {mostrarFormularioRecompensa ? "Cerrar formulario" : "Añadir Recompensa"}
        </button>
      </div>

      {/* Formulario para añadir recompensa */}
      {mostrarFormularioRecompensa && (
        <div style={{ backgroundColor: "#eee", padding: "15px", borderRadius: "8px", marginBottom: "20px", color: "#000" }}>
          <h3>Nueva Recompensa</h3>
          <input
            type="text"
            placeholder="Nombre"
            value={recompensa.name}
            onChange={(e) => setRecompensa({ ...recompensa, name: e.target.value })}
            style={{ padding: "8px", margin: "5px", width: "200px" }}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={recompensa.description}
            onChange={(e) => setRecompensa({ ...recompensa, description: e.target.value })}
            style={{ padding: "8px", margin: "5px", width: "200px" }}
          />
          <input
            type="number"
            placeholder="Puntos"
            value={recompensa.points}
            onChange={(e) => setRecompensa({ ...recompensa, points: e.target.value })}
            style={{ padding: "8px", margin: "5px", width: "200px" }}
          />
          <input
            type="number"
            placeholder="Stock"
            value={recompensa.Stock}
            onChange={(e) => setRecompensa({ ...recompensa, Stock: e.target.value })}
            style={{ padding: "8px", margin: "5px", width: "200px" }}
          />
          <br />
          <button onClick={handleCrearRecompensa} style={{ padding: "8px 16px", marginTop: "10px" }}>
            Guardar Recompensa
          </button>
          {mensajeRecompensa && <p style={{ marginTop: "10px" }}>{mensajeRecompensa}</p>}
        </div>
      )}

      {/* Tabla de clientes */}
      {clientesFiltrados.length === 0 ? (
        <p>No hay clientes que coincidan con la búsqueda.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px", backgroundColor: "#fff", color: "#000" }}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Correo</th>
              <th style={thStyle}>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>
                <td style={tdStyle}>{cliente.id}</td>
                <td style={tdStyle}>{cliente.name}</td>
                <td style={tdStyle}>{cliente.mail}</td>
                <td style={tdStyle}>{cliente.sueldo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  backgroundColor: "#6a0dad",
  color: "white",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};

export default Admin;
