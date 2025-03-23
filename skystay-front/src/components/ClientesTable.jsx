import { useState, useEffect } from "react";

function ClientesTable() {
  const [clientes, setClientes] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [username, setUsername] = useState("");

  // Cargar clientes al inicio
  useEffect(() => {
    fetch("http://localhost:8080/api/clientes")
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error("Error al cargar clientes:", error));
  }, []);

  // Función para obtener reservas por usuario
  const buscarReservas = () => {
    if (!username) {
      alert("Por favor, ingresa un nombre de usuario");
      return;
    }

    fetch(`http://localhost:8080/api/clientes/${username}/reservas`)
      .then((response) => response.json())
      .then((data) => setReservas(data))
      .catch((error) => console.error("Error al cargar reservas:", error));
  };

  return (
    <div>
      <h1>Lista de Clientes</h1>
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
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.name}</td>
              <td>{cliente.mail}</td>
              <td>{cliente.username}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Buscar Reservas</h2>
      <input
        type="text"
        placeholder="Escribe el usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={buscarReservas}>Buscar Reservas</button>

      {reservas.length > 0 && (
        <div>
          <h2>Reservas de {username}</h2>
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Número habitación</th>
                <th>Nombre hotel</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>
                  <td>{reserva.numeroHabitacion}</td>
                  <td>{reserva.nombreHotel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ClientesTable;
