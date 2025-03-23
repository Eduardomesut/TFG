import { useState, useEffect } from "react";
import axios from "axios";

const ClientesTable = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/clientes")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los clientes:", error);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
  {clientes.map((cliente) => (
    <tr key={cliente.id}>
      <td>{cliente.id}</td>
      <td>{cliente.name}</td>
      <td>{cliente.mail}</td>  {/* Aquí estaba el error, antes era cliente.email */}
      <td>{cliente.username}</td> {/* Muestra más datos si quieres */}
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default ClientesTable;
