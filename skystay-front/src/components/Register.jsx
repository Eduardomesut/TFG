import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [userType, setUserType] = useState("cliente");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

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
      navigate("/")
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="title">Registro de Usuario</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Registro completado con éxito</p>}

        <div className="form-fields">
          <div className="input-container">
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              className="input"
            />
          </div>
          <div className="input-container">
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="input"
            />
          </div>

          <div className="input-container">
            <label htmlFor="userType" className="label">Tipo de usuario:</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="input"
            >
              <option value="cliente">Cliente</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>

          <button
            onClick={handleRegister}
            className="submit-btn"
          >
            Registrarse
          </button>
        </div>
      </div>

      <style jsx>{`
        /* Global Styles */
        body {
          margin: 0;
          font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
          background: linear-gradient(to right, #a7c7f4, #9ad1eb);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 16px;
        }

        .form-container {
          background-color: white;
          box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
          border-radius: 16px;
          padding: 40px;
          width: 100%;
          max-width: 500px;
        }

        .title {
          font-size: 2rem;
          font-weight: bold;
          color: #2b3e73;
          text-align: center;
          margin-bottom: 24px;
        }

        .error-message {
          color: #e53e3e;
          font-size: 14px;
          text-align: center;
          margin-bottom: 16px;
        }

        .success-message {
          color: #38a169;
          font-size: 14px;
          text-align: center;
          margin-bottom: 16px;
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .input-container {
          display: flex;
          flex-direction: column;
        }

        .input {
          padding: 12px;
          margin-bottom: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          outline: none;
          font-size: 1rem;
        }

        .input:focus {
          border-color: #63b3ed;
          box-shadow: 0 0 0 2px rgba(99, 179, 237, 0.6);
        }

        .label {
          margin-bottom: 8px;
          color: #2d3748;
          font-size: 14px;
        }

        .submit-btn {
          background-color: #3182ce;
          color: white;
          font-weight: 600;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-size: 1rem;
          border: none;
        }

        .submit-btn:hover {
          background-color: #2b6cb0;
        }
      `}</style>
    </div>

  );
  
  
}

export default Register;
