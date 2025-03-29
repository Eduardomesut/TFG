import { useState, useEffect } from "react";

function AdminsTable() {
  const [admins, setClientes] = useState([]);

  // Cargar admins al inicio
  useEffect(() => {
    fetch("http://localhost:8080/api/administradores")
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error("Error al cargar clientes:", error));
  }, []);

  

  return (
    <div>
      <h1>Lista de Admins</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.name}</td>
              <td>{admin.mail}</td>
              <td>{admin.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminsTable;
