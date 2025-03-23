import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ClientesTable from "./components/ClientesTable";

function App() {
  return (
    <div>
      <h1>Gestión de Clientes</h1>
      <ClientesTable />
    </div>
  );
}

export default App;
