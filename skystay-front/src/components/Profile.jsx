import React, { useEffect, useState } from "react";

function Profile({ user }) {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      const res = await fetch(`http://localhost:8080/api/clientes/${user.username}/reservas`);
      const data = await res.json();
      setReservas(data);
    };
    fetchReservas();
  }, [user]);

  return (
    <div>
      <h2>Bienvenido, {user.username}</h2>
      <p>Email: {user.mail}</p>
      <h3>Reservas:</h3>
      <ul>
        {reservas.map((r, idx) => (
          <li key={idx}>{JSON.stringify(r)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
