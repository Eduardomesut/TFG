import { useState } from "react";
import Login from "./components/Login";
import ClientesTable from "./components/ClientesTable";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? <Login onLogin={setUser} /> : <ClientesTable />}
    </div>
  );
}

export default App;
