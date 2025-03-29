import { useState } from "react";

function Login({ onLogin }) {
  const [user, setUser] = useState(""); // Corregido: nombre coherente
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/administradores/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }), // Cambié "user" por "username"
      });

      if (!response.ok) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      const userData = await response.json(); // Cambié el nombre de la variable
      if (userData) {
        onLogin(userData); // Guarda el usuario y cambia a la vista de clientes
      } else {
        throw new Error("Error al procesar la respuesta del servidor");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión Administrador</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Usuario"
        value={user}
        onChange={(e) => setUser(e.target.value)} // Corregido: setUser en lugar de setUsername
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}

export default Login;
