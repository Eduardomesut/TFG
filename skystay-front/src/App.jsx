import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Canjear from "./components/Canjear";
import Admin from "./components/Admin";

function App() {
  const [user, setUser] = React.useState(null);
  const [admin, setAdmin] = React.useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} setAdmin={setAdmin} />} />

        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Login setUser={setUser} />} />
        <Route path="/admin" element={admin ? <Admin admin={admin} setAdmin={setAdmin} /> : <Login setAdmin={setAdmin} />} />
        <Route path="/canjear" element={<Canjear user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
