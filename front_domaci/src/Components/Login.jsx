import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

   
    if (email === 'ana.petrovic@example.com' && password === '123') {
      sessionStorage.setItem('role', 'admin'); 
      navigate('/muscle-group');
    } else if (email === 'marija.pavlovic@example.com' && password === '123') {
      sessionStorage.setItem('role', 'trener');
      navigate('/muscle-group');
    } else {
      sessionStorage.setItem('role', 'vezbac');
      navigate('/muscle-group');
      
    }
  };

  const handleSwitchToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Prijavite se</h1>
        <p>Pridružite se zajednici i kreirajte svoje trening planove!</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Unesite vaš email"
            required
          />

          <label htmlFor="password">Šifra</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Unesite vašu šifru"
            required
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-btn">Prijavi se</button>
        </form>
        <p className="switch-text">
          Nemate nalog?{' '}
          <button onClick={handleSwitchToRegister} className="register-switch">
            Registrujte se
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
