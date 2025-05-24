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

  const [usernameAmigo, setUsernameAmigo] = useState("");
  const [mensajeAmigo, setMensajeAmigo] = useState("");
  const [mostrarFormularioAmigo, setMostrarFormularioAmigo] = useState(false);

  const [mostrarAmigos, setMostrarAmigos] = useState(false);
  const [amigos, setAmigos] = useState([]);

  const [cantidadSaldo, setCantidadSaldo] = useState(0);
  const [mensajeSaldo, setMensajeSaldo] = useState("");
  const [mostrarFormularioCartera, setMostrarFormularioCartera] = useState(false);

  const [mostrarFormularioReserva, setMostrarFormularioReserva] = useState(false);

 


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
const handleAgregarAmigo = async () => {
  if (!usernameAmigo) {
    setMensajeAmigo("Introduce un nombre de usuario.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:8080/api/clientes/${user.id}/amigo/${usernameAmigo}`, {
      method: "PUT"
    });

    if (res.ok) {
      const data = await res.json();
      setMensajeAmigo(`Amigo añadido: ${usernameAmigo}`);
      setUsernameAmigo("");
      setMostrarFormularioAmigo(false); // Ocultar formulario después de añadir
      await fetchDatosUsuario(); // Refresca datos
    } else if (res.status === 401) {
      setMensajeAmigo("Usuario no encontrado o no válido.");
    } else {
      setMensajeAmigo("Error al intentar añadir amigo.");
    }
  } catch (error) {
    setMensajeAmigo("Error de conexión con el servidor.");
  }
};
const handleModificarSaldo = async () => {
  try {
    const res = await fetch(`http://localhost:8080/api/clientes/${user.id}/saldo/${cantidadSaldo}`, {
      method: "PUT"
    });

    if (res.ok) {
      const data = await res.json();
      setUserData(data); // actualiza localmente el sueldo
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setMensajeSaldo("Saldo actualizado con éxito.");
    } else if (res.status === 404) {
      setMensajeSaldo("Cliente no encontrado.");
    } else {
      setMensajeSaldo("Error al modificar el saldo.");
    }
  } catch (error) {
    setMensajeSaldo("Error de conexión con el servidor.");
  }
};


const fetchAmigos = async () => {
  try {
    const res = await fetch(`http://localhost:8080/api/clientes/${user.id}/amigos`);
    if (res.ok) {
      const data = await res.json();
      setAmigos(data);
    } else if (res.status === 401) {
      setAmigos([]);
    }
  } catch (error) {
    console.error("Error al obtener los amigos:", error);
  }
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
  const cancelarReserva = async (id) => {
    
  try {
    const response = await fetch(`http://localhost:8080/api/clientes/reserva/borrar/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      
       await fetchDatosUsuario(); // esto actualizará userData
      await fetchReservas();     // esto actualizará reservas

      //setUserData(await fetch(`http://localhost:8080/api/clientes/${user.id}`).then(r => r.json())); // global
      const userData = await fetch(`http://localhost:8080/api/clientes/${user}`);
      const userJson = await userData.json();
      setUser(userJson);
      localStorage.setItem("user", JSON.stringify(userJson));
      navigate("/profile");
      window.location.reload();
      // Eliminar del estado local solo si se borró correctamente en el backend
      //setReservas(prevReservas => prevReservas.filter(r => r.id !== id));
    } else {
      console.error("No se pudo eliminar la reserva.");
    }
  } catch (error) {
    console.error("Error al eliminar la reserva:", error);
  }
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
          width:1700px;
          
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
         .banner {
          background-image: url('/bannerSkyStay.png');
          background-size: cover;
          background-position: center;
          padding: 2rem;
          height: 200px;
          width: 900px;
          color: white;
          border-radius: 5px;
        }
          .video-container {
  position: relative;
  width: 100%;
  height: 300px; /* o ajusta según lo que necesites */
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: 0;
  object-fit: cover;
  filter: brightness(0.8); /* oscurece un poco para mejor contraste del texto */
}
  .sticky-header {
  position: sticky;
  top: 0;
  background-color: #0A3D62;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 8px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: 60px;
  margin-bottom: 30px;
}

.logo {
  height: 150px; /* ajusta según tu imagen */
}

.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  padding: 1rem;
}



        .section {
          margin-top: 0.5rem;
        }
          .linea{
          display: inline;
          }

        label {
          font-weight: bold;
          color: white;
        }
      `}</style>
      <header class="sticky-header">
  <img src="/logobannersky.png" alt="Logo" class="logo"/>
  <div style={{ marginLeft: "auto", display: "flex", gap: "1rem" }}>
    <button
      onClick={() => setMostrarFormularioReserva(true)}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#1abc9c",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "bold",
        transition: "all 0.3s ease-in-out"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "#16a085";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "#1abc9c";
      }}
    >
      Añadir reserva
    </button>

    <button
      onClick={handleLogout}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#e74c3c",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "bold",
        transition: "all 0.3s ease-in-out"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "#c0392b";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "#e74c3c";
      }}
    >
      Cerrar sesión
    </button>
  </div>
</header>
      <div>
    <div className="banner">
      <div className="linea" style={{ display: "flex", gap: "6rem", alignItems: "center", marginTop: "-3rem" }}>
  <h2>Bienvenido, {userData.username}</h2>
  <p>Cartera: {userData.sueldo}€</p>
  <p>Email: {userData.mail}</p>
       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
  <p style={{ marginRight: 8 }}>Puntos: {userData.points}</p>
  <button
    onClick={() => navigate("/canjear", { state: { user } })}
          style={{
    padding: "0.50rem 1.0rem",
    backgroundColor: "#42a5f5", // verde más elegante
    color: "#fff",
    border: "1px solidrgb(156, 20, 20)",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out"
  }}
  onMouseOver={e => {
    e.currentTarget.style.backgroundColor = "#1565c0";
    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
  }}
  onMouseOut={e => {
    e.currentTarget.style.backgroundColor = "#42a5f5";
    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  }}
  >
    Canjear Recompensa
  </button>
</div>
</div>

 </div>
      
    </div>
    <div style={{ display: "flex", gap: "3rem", alignItems: "center", marginTop: "1rem", flexWrap: "wrap" }}>
      <div className="section">
        {!mostrarFormularioCartera ? (
    <button
  onClick={() => setMostrarFormularioCartera(true)}
  style={{
    padding: "0.75rem 1.5rem",
    backgroundColor: "#2E8B57", // verde más elegante
    color: "#fff",
    border: "1px solid #2E8B57",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out"
  }}
  onMouseOver={e => {
    e.currentTarget.style.backgroundColor = "#246b45";
    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
  }}
  onMouseOut={e => {
    e.currentTarget.style.backgroundColor = "#2E8B57";
    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  }}
>
  Añadir dinero
</button>

  ) : (
    <div>
  <h3>Modificar saldo</h3>
  <input
    type="number"
    value={cantidadSaldo}
    onChange={(e) => setCantidadSaldo(Number(e.target.value))}
    style={{
      padding: "0.5rem",
      marginRight: "0.5rem",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "120px"
    }}
  />

  <button
    onClick={handleModificarSaldo}
    style={{
    padding: "0.75rem 1.5rem",
    backgroundColor: "#2E8B57", // verde más elegante
    color: "#fff",
    border: "1px solid #2E8B57",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out"
  }}
  onMouseOver={e => {
    e.currentTarget.style.backgroundColor = "#246b45";
    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
  }}
  onMouseOut={e => {
    e.currentTarget.style.backgroundColor = "#2E8B57";
    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  }}
  >
    Aplicar
  </button>
  <button
        onClick={() => {
          setMostrarFormularioCartera(false);        
        }}
        style={{
    padding: "0.75rem 1.5rem",
    backgroundColor: "#d9534f", // verde más elegante
    color: "#fff",
    border: "1px solidrgb(156, 20, 20)",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out"
  }}
  onMouseOver={e => {
    e.currentTarget.style.backgroundColor = "#c62828";
    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
  }}
  onMouseOut={e => {
    e.currentTarget.style.backgroundColor = "#d9534f";
    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  }}
      >
        Cancelar
      </button>
  {mensajeSaldo && <p style={{ color: "white", marginTop: "0.5rem" }}>{mensajeSaldo}</p>}
  </div>
  )}
</div>

<div className="section">
  {!mostrarFormularioAmigo ? (
    <button
      onClick={() => setMostrarFormularioAmigo(true)}
            style={{
    padding: "0.75rem 1.5rem",
    backgroundColor: "#9c27b0", // verde más elegante
    color: "#fff",
    border: "1px solidrgb(156, 20, 20)",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out"
  }}
  onMouseOver={e => {
    e.currentTarget.style.backgroundColor = "#6a1b9a";
    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
  }}
  onMouseOut={e => {
    e.currentTarget.style.backgroundColor = "#9c27b0";
    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  }}
    >
      Añadir amigo
    </button>
  ) : (
    <div>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={usernameAmigo}
        onChange={(e) => setUsernameAmigo(e.target.value)}
        style={{
          padding: "0.5rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginRight: "0.5rem"
        }}
      />
      <button
        onClick={handleAgregarAmigo}
        style={{
    padding: "0.75rem 1.5rem",
    backgroundColor: "#2E8B57", // verde más elegante
    color: "#fff",
    border: "1px solid #2E8B57",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out"
  }}
  onMouseOver={e => {
    e.currentTarget.style.backgroundColor = "#246b45";
    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
  }}
  onMouseOut={e => {
    e.currentTarget.style.backgroundColor = "#2E8B57";
    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  }}
      >
        Confirmar
      </button>
      <button
        onClick={() => {
          setMostrarFormularioAmigo(false);
          setUsernameAmigo("");
          setMensajeAmigo("");
        }}
            style={{
    padding: "0.75rem 1.5rem",
    backgroundColor: "#d9534f", // verde más elegante
    color: "#fff",
    border: "1px solidrgb(156, 20, 20)",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out"
  }}
  onMouseOver={e => {
    e.currentTarget.style.backgroundColor = "#c62828";
    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
  }}
  onMouseOut={e => {
    e.currentTarget.style.backgroundColor = "#d9534f";
    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  }}
      >
        Cancelar
      </button>
    </div>
  )}
  {mensajeAmigo && <p style={{ color: "white", marginTop: "0.5rem" }}>{mensajeAmigo}</p>}
</div>

<div className="section">
  <button
    onClick={() => {
      if (!mostrarAmigos) {
        fetchAmigos();
      }
      setMostrarAmigos(!mostrarAmigos);
    }}
           style={{
    padding: "0.75rem 1.5rem",
    backgroundColor: "#42a5f5", // verde más elegante
    color: "#fff",
    border: "1px solidrgb(156, 20, 20)",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out"
  }}
  onMouseOver={e => {
    e.currentTarget.style.backgroundColor = "#1565c0";
    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
  }}
  onMouseOut={e => {
    e.currentTarget.style.backgroundColor = "#42a5f5";
    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  }}
  >
    {mostrarAmigos ? "Ocultar amigos" : "Amigos"}
  </button>

  {mostrarAmigos && (
    <div style={{ marginTop: "1rem", color: "white" }}>
      {amigos.length === 0 ? (
        <p>No tienes amigos añadidos.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {amigos.map((amigo) => (
            <li
              key={amigo}
              style={{
                backgroundColor: "#2c3e50",
                color: "#ecf0f1",
                padding: "0.5rem",
                marginBottom: "0.5rem",
                borderRadius: "5px"
              }}
            >
              {amigo}
            </li>
          ))}
        </ul>
      )}
    </div>
  )}
</div>
</div>

  <div className="section">
  {!mostrarFormularioReserva ? (
    <button
      onClick={() => setMostrarFormularioReserva(true)}
               style={{
    padding: "0.75rem 1.5rem",
    backgroundColor: "#ff7043", // verde más elegante
    color: "#fff",
    border: "1px solidrgb(156, 20, 20)",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out"
  }}
  onMouseOver={e => {
    e.currentTarget.style.backgroundColor = "#f4511e";
    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
  }}
  onMouseOut={e => {
    e.currentTarget.style.backgroundColor = "#ff7043";
    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  }}
    >
      Añadir reserva
    </button>
  ) : (

      <div className="section">
        <h3>Selecciona un hotel:</h3>
        <select onChange={handleHotelChange} value={hotelSeleccionado || ""}>
          <option value="" disabled>Elige un hotel</option>
          {hoteles.map(h => (
            <option key={h.id} value={h.id}>{h.name}</option>
          ))}
        </select>
      </div>
  )}</div>
  

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
    <li key={idx}>
      {'Hotel: ' + r.nombreHotel + ' - Número habitación: ' + r.numeroHabitacion + ' - Entrada: ' + r.entryDate + ' - Salida: ' + r.exitDate}
      <button
        onClick={() => {cancelarReserva(r.id)} }
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "red",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginLeft: 8
        }}
      >
        Cancelar Reserva
      </button>
    </li>
  ))}
</ul>

      </div>
      <div class="video-container">
  <video
  autoPlay
  muted
  loop
  playsInline
  className="background-video"
>
    <source src="/skystayvideo.mp4" type="video/mp4" />
    Tu navegador no soporta videos HTML5.
  </video>
  <div class="overlay-text">
    Disfrute de sus vacaciones con <strong>SkyStay</strong>
  </div>
</div>

    </div>
  );
}

export default Profile;
