import React, { useState } from 'react';
import './App.css'; // Optional: use a separate CSS file

export default function App() {
  const [form, setForm] = useState({ email: '', password: '', role: 'user' });
  const [isLogin, setIsLogin] = useState(true);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? 'login' : 'signup';
    const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    setMsg(data.msg || data.error);
  };

  const resetForm = () => {
    setForm({ email: '', password: '', role: 'user' });
    setMsg('');
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {!isLogin && (
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          )}

          <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
        </form>

        <p className="message">{msg}</p>

        <button className="toggle-btn" onClick={() => {
          setIsLogin(!isLogin);
          resetForm();
        }}>
          Switch to {isLogin ? 'Signup' : 'Login'}
        </button>
      </div>
    </div>
  );
}
