import { useState, useEffect } from "react";

function ClientesTable() {
  const [clientes, setClientes] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/clientes")
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error("Error al cargar clientes:", error));
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Clientes */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 p-6">
            <h1 className="text-4xl font-bold text-white text-center tracking-wide">
              Lista de Clientes
            </h1>
          </div>
          <div className="overflow-x-auto p-6">
            <table className="w-full table-auto border-collapse text-sm">
              <thead>
                <tr className="bg-yellow-100 text-yellow-900 uppercase text-xs">
                  <th className="px-6 py-3 border-b border-yellow-200">ID</th>
                  <th className="px-6 py-3 border-b border-yellow-200">Nombre</th>
                  <th className="px-6 py-3 border-b border-yellow-200">Email</th>
                  <th className="px-6 py-3 border-b border-yellow-200">Usuario</th>
                  <th className="px-6 py-3 border-b border-yellow-200">Cuenta Verificada</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {clientes.map((cliente, index) => (
                  <tr
                    key={cliente.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-yellow-50"
                    } hover:bg-yellow-100 transition-colors`}
                  >
                    <td className="px-6 py-3 border-b">{cliente.id}</td>
                    <td className="px-6 py-3 border-b">{cliente.name}</td>
                    <td className="px-6 py-3 border-b">{cliente.mail}</td>
                    <td className="px-6 py-3 border-b">{cliente.username}</td>
                    <td className="px-6 py-3 border-b">
                      {cliente.isVerified ? "Sí" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Buscar reservas */}
        <div className="bg-white shadow-xl rounded-xl p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-yellow-700 text-center">Buscar Reservas</h2>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-1/3"
            />
            <button
              onClick={buscarReservas}
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
            >
              Buscar Reservas
            </button>
          </div>
        </div>

        {/* Tabla de reservas */}
        {reservas.length > 0 && (
          <div className="bg-white shadow-xl rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-yellow-700 text-center mb-4">
              Reservas de <span className="font-bold">{username}</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse text-sm">
                <thead>
                  <tr className="bg-yellow-100 text-yellow-900 uppercase text-xs">
                    <th className="px-6 py-3 border-b border-yellow-200">ID</th>
                    <th className="px-6 py-3 border-b border-yellow-200">Habitación</th>
                    <th className="px-6 py-3 border-b border-yellow-200">Hotel</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {reservas.map((reserva, index) => (
                    <tr
                      key={reserva.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-yellow-50"
                      } hover:bg-yellow-100 transition-colors`}
                    >
                      <td className="px-6 py-3 border-b">{reserva.id}</td>
                      <td className="px-6 py-3 border-b">{reserva.numeroHabitacion}</td>
                      <td className="px-6 py-3 border-b">{reserva.nombreHotel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientesTable;
