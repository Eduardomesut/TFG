import { useState } from "react";
import Login from "./components/Login";
import Signin from "./components/Signin";
import ClientesTable from "./components/ClientesTable";
import LoginAdmin from "./components/LoginAdmin";
import AdminPage from "./components/AdminPage";

function App() {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div>
      {!user ? (
        isAdmin ? (
          <LoginAdmin onLogin={(admin) => { setUser(admin); setIsAdmin(true); }} onCancel={() => setIsAdmin(false)} />
        ) : isRegistering ? (
          <Signin onSignin={() => setIsRegistering(false)} />
        ) : (
          <>
            <Login onLogin={setUser} />
            <button onClick={() => setIsRegistering(true)}>Registro</button>
            <button onClick={() => setIsAdmin(true)}>Administrador</button>
          </>
        )
      ) : isAdmin ? (
        <AdminPage />
      ) : (
        <ClientesTable />
      )}
    </div>
  );
}

export default App;
