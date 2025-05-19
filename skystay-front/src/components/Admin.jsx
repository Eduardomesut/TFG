// src/components/Admin.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Admin({ admin, setAdmin }) {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/clientes")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los clientes:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px", backgroundColor: "#4b0082", color: "#fff", minHeight: "100vh" }}>
      <h1>Panel de Administración</h1>
      <h2>Lista de Clientes Registrados</h2>
      {clientes.length === 0 ? (
        <p>No hay clientes registrados.</p>
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
            {clientes.map((cliente) => (
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
