import React, { useEffect, useState } from "react";

function Profile({ user }) {
  const [reservas, setReservas] = useState([]);
  const [hoteles, setHoteles] = useState([]);
  const [hotelSeleccionado, setHotelSeleccionado] = useState(null);
  const [habitaciones, setHabitaciones] = useState([]);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");



  useEffect(() => {
    const fetchReservas = async () => {
      const res = await fetch(`http://localhost:8080/api/clientes/${user.username}/reservas`);
      const data = await res.json();
      setReservas(data);
    };

    const fetchHoteles = async () => {
      const res = await fetch(`http://localhost:8080/api/hoteles`);
      const data = await res.json();
      setHoteles(data);
    };

    fetchReservas();
    fetchHoteles();
  }, [user]);

  const handleHotelChange = async (e) => {
    const hotelId = e.target.value;
    setHotelSeleccionado(hotelId);

    const res = await fetch(`http://localhost:8080/api/habitaciones/${hotelId}`);
    const data = await res.json();
    setHabitaciones(data);
  };
  const calcularNoches = () => {
    const entrada = new Date(fechaIngreso);
    const salida = new Date(fechaSalida);
    const diferencia = salida - entrada;
    return Math.max(0, Math.ceil(diferencia / (1000 * 60 * 60 * 24)));
  };
  
  const calcularPrecioTotal = () => {
    return calcularNoches() * habitacionSeleccionada.price;
  };
  
  const handleReserva = async () => {
    if (!fechaIngreso || !fechaSalida || calcularNoches() <= 0) {
      alert("Selecciona fechas válidas.");
      return;
    }
  
    const reservaData = {
      entryDate: fechaIngreso,
      exitDate: fechaSalida,
      isPayed: false,
      description: "Reserva realizada desde frontend",
      price: calcularPrecioTotal()
    };
  
    const res = await fetch(
      `http://localhost:8080/api/clientes/${user.id}/${habitacionSeleccionada.id}/reserva`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reservaData)
      }
    );
  
    if (res.ok) {
      alert("Reserva realizada con éxito");
      setHabitacionSeleccionada(null);
      setFechaIngreso("");
      setFechaSalida("");
    } else {
      alert("Error al realizar la reserva. Puede que la habitación esté ocupada.");
    }
  };
  

  return (
    <div className="container">
      <style>{`
        .container {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(to right, rgb(31, 70, 143), rgb(3, 30, 69));
      padding: 2rem;
      border-radius: 10px;
      max-width: 1200px;         /* Más ancho que antes */
      margin: 4rem auto;         /* Centrado vertical y horizontalmente */
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      
      
        }

  



        h2 {
          color:rgb(255, 255, 255);
          margin-bottom: 0.5rem;
        }

        p {
          color:rgb(255, 255, 255);
          margin-bottom: 1rem;
        }

        select {
          padding: 0.5rem;
          margin: 1rem 0;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          background: #34495e;
          margin: 0.5rem 0;
          padding: 0.75rem;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }

        .section {
          margin-top: 2rem;
        }

        label {
          font-weight: bold;
        }
      `}</style>

      <h2>Bienvenido, {user.username}</h2>
      <p>Email: {user.mail}</p>
      <p>Puntos: {user.points}</p>
      <button
  onClick={() => window.location.href = "/canjear"}
  style={{
    padding: "0.5rem 1rem",
    backgroundColor: "#2980b9",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "1rem"
  }}
>
  Canjear Recompensa
</button>


      <div className="section">
        <h3>Selecciona un hotel:</h3>
        <select onChange={handleHotelChange} value={hotelSeleccionado || ""}>
          <option value="" disabled>Elige un hotel</option>
          {hoteles.map(h => (
            <option key={h.id} value={h.id}>{h.name}</option>
          ))}
        </select>
      </div>

      {hotelSeleccionado && (
        <div className="section">
          <h3>Habitaciones disponibles:</h3>
          <ul>
          {habitaciones.length > 0 ? (
  habitaciones.map((hab, idx) => (
    <li key={idx}>
      <button
        onClick={() => setHabitacionSeleccionada(hab)}
        style={{
          backgroundColor: "#1abc9c",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "0.5rem",
          cursor: "pointer",
          width: "100%",
          textAlign: "left"
        }}
      >
        Tipo: {hab.type} | Precio: {hab.price}€ | Descripción: {hab.description}
      </button>
    </li>
  ))
) : (
  <li>No hay habitaciones disponibles para este hotel.</li>
)}

          </ul>
          {habitacionSeleccionada && (
  <div className="section">
    <h3>Seleccionaste la habitación: {habitacionSeleccionada.type}</h3>

    <label>Fecha de entrada:</label>
    <input
      type="date"
      value={fechaIngreso}
      onChange={(e) => setFechaIngreso(e.target.value)}
      style={{ padding: "0.5rem", marginBottom: "1rem", display: "block" }}
    />

    <label>Fecha de salida:</label>
    <input
      type="date"
      value={fechaSalida}
      onChange={(e) => setFechaSalida(e.target.value)}
      style={{ padding: "0.5rem", marginBottom: "1rem", display: "block" }}
    />

    {fechaIngreso && fechaSalida && (
      <>
        <p style={{ color: "#fff" }}>
          Noches: {calcularNoches()}<br />
          Precio total: {calcularPrecioTotal()} €
        </p>

        <button
          onClick={handleReserva}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#27ae60",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "1rem"
          }}
        >
          Confirmar Reserva
        </button>
      </>
    )}
  </div>
)}



        </div>
      )}

      <div className="section">
        <h3>Mis reservas:</h3>
        <ul>
          {reservas.map((r, idx) => (
            <li key={idx}>{JSON.stringify(r)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
