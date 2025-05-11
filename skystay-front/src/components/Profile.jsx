import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

////Falta que cuando se realiza una reserva se actulice la información

function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [hoteles, setHoteles] = useState([]);
  const [hotelSeleccionado, setHotelSeleccionado] = useState(null);
  const [habitaciones, setHabitaciones] = useState([]);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);

  const [fechaIngreso, setFechaIngreso] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [rangoFechas, setRangoFechas] = useState([null, null]);
  const [startDate, endDate] = rangoFechas;
  const [userData, setUserData] = useState(user);

  //const [userReset, setUsername] = useState("");

const fetchDatosUsuario = async () => {
  const res = await fetch(`http://localhost:8080/api/clientes/${user.username}`);
  const data = await res.json();
  setUserData(data);
};

const handleLogout = () => {
  localStorage.removeItem("user");
  setUser(null);
  navigate("/login");
};


const fetchReservas = async () => {
  const res = await fetch(`http://localhost:8080/api/clientes/${user.username}/reservas`);
  const data = await res.json();
  setReservas(data);
};


useEffect(() => {
  fetchDatosUsuario();
  fetchReservas();
  const fetchHoteles = async () => {
    const res = await fetch(`http://localhost:8080/api/hoteles`);
    const data = await res.json();
    setHoteles(data);
  };
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
    return calcularNoches() * (habitacionSeleccionada?.price || 0);
  };

  const handleReserva = async () => {
   


    if (!habitacionSeleccionada || !fechaIngreso || !fechaSalida || calcularNoches() <= 0) {
      alert("Selecciona una habitación y fechas válidas.");
      return;
    }

    

    
      const entryDate = fechaIngreso;
      const exitDate = fechaSalida;
      const isPayed = false;
      const description = "Reserva realizada desde frontend";
      
    
    
    const res = await fetch(
      `http://localhost:8080/api/clientes/${user.id}/${habitacionSeleccionada.id}/reserva`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({entryDate, exitDate, isPayed, description}),
      }
    );

    if (res.ok) {
      const success = await res.json();
      if (success) {
        alert("Reserva realizada con éxito");
      setHabitacionSeleccionada(null);
      setFechaIngreso("");
      setFechaSalida("");
      setRangoFechas([null, null]);

      await fetchDatosUsuario(); // esto actualizará userData
      await fetchReservas();     // esto actualizará reservas

      //setUserData(await fetch(`http://localhost:8080/api/clientes/${user.id}`).then(r => r.json())); // global
      const userData = await fetch(`http://localhost:8080/api/clientes/${user}`);
      const userJson = await userData.json();
      setUser(userJson);
      localStorage.setItem("user", JSON.stringify(userJson));
      navigate("/profile");
      window.location.reload();

      

        
      }
       else {
        alert("Error al realizar la reserva. Puede que la habitación esté ocupada.");
      }
    } else {
      alert("Error al conectar con el servidor.");
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
          max-width: 1200px;
          margin: 4rem auto;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
        }

        h2, h3, p, li {
          color: white;
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
          color: white;
        }
      `}</style>

      <h2>Bienvenido, {userData.username}</h2>
      <p>Email: {userData.mail}</p>
      <p>Puntos: {userData.points}</p>
      <button
        onClick={() => navigate("/canjear", { state: { user } })}
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
          <h3>Vista previa del hotel seleccionado:</h3>
      <img
      src={`/hotel${hotelSeleccionado}.jpg`}
      alt="Vista previa del hotel"
      style={{
      width: "100%",
      maxHeight: "250px",
      objectFit: "cover",
      borderRadius: "10px",
      marginBottom: "1rem"
    }}
/>

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
              <label>Selecciona rango de fechas:</label>
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setRangoFechas(update);
                  setFechaIngreso(update[0]?.toISOString().split("T")[0] || "");
                  setFechaSalida(update[1]?.toISOString().split("T")[0] || "");
                }}
                isClearable={true}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
              />

              {fechaIngreso && fechaSalida && (
                <>
                  <p>Noches: {calcularNoches()}</p>
                  <p>Precio total: {calcularPrecioTotal()} €</p>
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
