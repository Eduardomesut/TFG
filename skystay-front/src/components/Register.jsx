import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [userType, setUserType] = useState("cliente");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    try {
      const formattedBirthdate = birthdate
        ? new Date(birthdate).toISOString().split("T")[0]
        : "";

      const apiUrl =
        userType === "administrador"
          ? "http://localhost:8080/api/administradores"
          : "http://localhost:8080/api/clientes";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          name,
          password,
          mail,
          birthdate: formattedBirthdate,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la introducción de datos");
      }

      setSuccess(true);
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div className="register-form">
      <h2>Registro</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Registro completado con éxito</p>}

      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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

      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
}

export default Register;
