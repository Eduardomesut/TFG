// src/components/Admin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin({ admin, setAdmin }) {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState([]);

  useEffect(() => {
    axios.get("https://tfg-5ljt.onrender.com/api/clientes")
      .then((response) => {
        setClientes(response.data);
        setClientesFiltrados(response.data); // Inicialmente muestra todos
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
