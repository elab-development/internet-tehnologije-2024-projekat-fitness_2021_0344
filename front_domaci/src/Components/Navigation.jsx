import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Navigation.css';

const Navigation = () => {
  const navigate = useNavigate();

  const role = sessionStorage.getItem('role') || 'vezbac'; 

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navigation">
      <div className="nav-left">
        <ul>
          {role === 'admin' && (
            <>
              <li><Link to="/muscle-group">Grupe Mišića</Link></li>
              <li><Link to="/add-group">Dodaj Grupu</Link></li>
              <li><Link to="/treneri">Treneri</Link></li>
              <li><Link to="/vezbaci">Vežbači</Link></li>
            </>
          )}
          {role === 'trener' && (
            <>
              <li><Link to="/muscle-group">Grupe Mišića</Link></li>
            </>
          )}
          {role === 'vezbac' && (
            <>
              <li><Link to="/muscle-group">Grupe Mišića</Link></li>
              <li><Link to="/kreiraj-plan">Sastavi Plan</Link></li>
              <li><Link to="/moj-dnevnik">Moj Dnevnik</Link></li>
              <li><Link to="/dodaj-dnevnik">Dodaj Novi Dnevnik</Link></li>
              <li><Link to="/planovi">Planovi</Link></li>
            </>
          )}
        </ul>
      </div>
      <div className="nav-right">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navigation;
