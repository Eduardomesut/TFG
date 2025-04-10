import { useState } from "react";

function Signin({ onSignin }) {
  const [username, setUser] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [userType, setUserType] = useState("cliente"); // Valor por defecto
  const [error, setError] = useState("");

  const handleSignin = async () => {
    try {
      const formattedBirthdate = birthdate ? new Date(birthdate).toISOString().split("T")[0] : "";
      const apiUrl = userType === "administrador" ? "http://localhost:8080/api/administradores" : "http://localhost:8080/api/clientes";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password, mail, birthdate: formattedBirthdate }),
      });

      if (!response.ok) {
        throw new Error("Error en la introducción de datos");
      }

      const userData = await response.json();
      if (userData) {
        onSignin(userData); // Guarda el usuario y cambia a la vista de clientes/administradores
      } else {
        throw new Error("Error al procesar la respuesta del servidor");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />
      <input
        type="date"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />

      <div>
        <label htmlFor="userType">Tipo de usuario:</label>
        <select
          id="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="cliente">Cliente</option>
          <option value="administrador">Administrador</option>
        </select>
      </div>

      <button onClick={handleSignin}>Registrarse</button>
    </div>
  );
}

export default Signin;