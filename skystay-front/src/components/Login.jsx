import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [user, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/clientes/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });

    const success = await response.json();
    if (success) {
      const userData = await fetch(`http://localhost:8080/api/clientes/${user}`);
      const userJson = await userData.json();
      setUser(userJson);
      localStorage.setItem("user", JSON.stringify(userJson));
      navigate("/profile");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const handleBack = () => {
    navigate("/"); 
  };

  return (
    <>
      <style>{`
        body {
          background: url('https://images.unsplash.com/photo-1501117716987-c8e1ecb210d5?auto=format&fit=crop&w=1400&q=80') no-repeat center center fixed;
          background-size: cover;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        form {
          background-color: rgba(255, 255, 255, 0.95);
          padding: 2rem 3rem;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
          text-align: center;
          min-width: 300px;
          position: relative;
        }

        form h2 {
          margin-bottom: 1.5rem;
          color: #2c3e50;
        }

        form input {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        form input:focus {
          border-color: #2980b9;
          outline: none;
        }

        form button {
          width: 100%;
          padding: 0.75rem;
          background-color: #2980b9;
          color: white;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        form button:hover {
          background-color: #1c5d87;
        }

        .back-button {
          position: absolute;
          top: -2.5rem;
          left: 0;
          background-color: #e74c3c;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .back-button:hover {
          background-color: #c0392b;
        }
      `}</style>

      <form onSubmit={handleSubmit}>
        <button type="button" className="back-button" onClick={handleBack}>← Atrás</button>
        <h2>Iniciar Sesión</h2>
        <input
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </>
  );
}

export default Login;
