import { useState } from "react";
import Login from "./components/Login";
import Signin from "./components/Signin";
import ClientesTable from "./components/ClientesTable";

function App() {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div>
      {!user ? (
        isRegistering ? (
          <Signin onSignin={() => setIsRegistering(false)} />
        ) : (
          <>
            <Login onLogin={setUser} />
            <button onClick={() => setIsRegistering(true)}>Registro</button>
          </>
        )
      ) : (
        <ClientesTable />
      )}
    </div>
  );
}

export default App;
