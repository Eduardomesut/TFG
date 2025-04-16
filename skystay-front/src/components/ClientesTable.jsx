import { useEffect, useState } from "react";

function ClientesTable({ user }) {
  const [cliente, setCliente] = useState(null);
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    if (user && user.username) {
      fetch(`http://localhost:8080/api/clientes/${user.username}`)
        .then((res) => res.json())
        .then((data) => setCliente(data))
        .catch((err) => console.error("Error al cargar el cliente:", err));

      fetch(`http://localhost:8080/api/clientes/${user.username}/reservas`)
        .then((res) => res.json())
        .then((data) => setReservas(data))
        .catch((err) => console.error("Error al cargar reservas:", err));
    }
  }, [user]);


  return (
    
    
    <div className="p-8 space-y-8">
      {cliente && (
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 p-6">
            <h1 className="text-4xl font-bold text-white text-center tracking-wide">
              Información del Cliente
            </h1>
          </div>
          <div className="p-6 text-gray-800 space-y-2">
            <p><strong>ID:</strong> {cliente.id}</p>
            <p><strong>Nombre:</strong> {cliente.name}</p>
            <p><strong>Email:</strong> {cliente.mail}</p>
            <p><strong>Usuario:</strong> {cliente.username}</p>
            <p><strong>Cuenta Verificada:</strong> {cliente.isVerified ? "Sí" : "No"}</p>
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold text-center text-yellow-700 mb-4">
        ¡Bienvenido, {user.user}!
      </h1>

      <div className="bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-yellow-700 text-center mb-4">
          Reservas registradas 
        </h2>

        {reservas.length > 0 ? (
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
        ) : (
          <p className="text-center text-gray-500">No tienes reservas registradas.</p>
        )}
      </div>
    </div>
  );
}

export default ClientesTable;
