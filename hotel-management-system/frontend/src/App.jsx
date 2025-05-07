// 📁 client/src/App.jsx (React + Tailwind Frontend Entry Point)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Manager from './pages/Manager';
import AddRoom from './pages/AddRoom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/addroom" element={<AddRoom />} />
      </Routes>
    </Router>
  );
}

export default App;