import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Canjear from "./components/Canjear";

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Login setUser={setUser} />} />
        <Route path="/canjear" element={<Canjear user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
