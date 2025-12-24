import React, { useState } from 'react';
import './DodajNoviDnevnik.css';
import Navigation from './Navigation';
import Footer from './Footer';

const DodajNoviDnevnik = () => {
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log('Novi dnevnik:', {
      naziv,
      opis,
      
    });
   
  };

  return (
    <>
      <Navigation />
      <div className="dodaj-dnevnik-container">
        <h1>Dodaj Novi Dnevnik</h1>
        <form onSubmit={handleSubmit} className="dodaj-dnevnik-form">
          <div className="form-group">
            <label htmlFor="naziv">Naziv Dnevnika:</label>
            <input
              type="text"
              id="naziv"
              value={naziv}
              onChange={(e) => setNaziv(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="opis">Kratak Opis:</label>
            <textarea
              id="opis"
              value={opis}
              onChange={(e) => setOpis(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="submit-btn">Dodaj Dnevnik</button>
        </form>
      </div>
      <Footer/>
    </>
  );
};

export default DodajNoviDnevnik;
