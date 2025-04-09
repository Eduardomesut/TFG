import { useState, useEffect } from "react";

function AdminsTable() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/administradores")
      .then((response) => response.json())
      .then((data) => setAdmins(data))
      .catch((error) => console.error("Error al cargar administradores:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-6">
          <h1 className="text-3xl font-bold text-white text-center">Administradores del Hotel</h1>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-yellow-100 text-yellow-900 uppercase text-sm">
                <th className="px-4 py-3 border-b border-yellow-200">ID</th>
                <th className="px-4 py-3 border-b border-yellow-200">Nombre</th>
                <th className="px-4 py-3 border-b border-yellow-200">Email</th>
                <th className="px-4 py-3 border-b border-yellow-200">Usuario</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {admins.map((admin, index) => (
                <tr
                  key={admin.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-yellow-50"
                  } hover:bg-yellow-100 transition-colors`}
                >
                  <td className="px-4 py-3 border-b">{admin.id}</td>
                  <td className="px-4 py-3 border-b">{admin.name}</td>
                  <td className="px-4 py-3 border-b">{admin.mail}</td>
                  <td className="px-4 py-3 border-b">{admin.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminsTable;
