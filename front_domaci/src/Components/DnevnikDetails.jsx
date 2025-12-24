import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DnevnikDetails.css';
import Navigation from './Navigation';
import Footer from './Footer';

const DnevnikDetails = () => {
  const location = useLocation();
  const dnevnik = location.state?.dnevnik; 

  const [aktivnosti, setAktivnosti] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (dnevnik) {
      setAktivnosti(dnevnik.aktivnosti.sort((a, b) => new Date(b.datum) - new Date(a.datum)));
    }
  }, [dnevnik]);

  const handleDodajAktivnost = () => {
    navigate(`/dodaj-aktivnost/${dnevnik.id}`);
  };

  if (!dnevnik) {
    return <p>Podaci o dnevniku nisu dostupni.</p>;
  }

  return (
    <>
      <Navigation />
      <div className="dnevnik-details-container">
        <h1>{dnevnik.naziv}</h1>
        <button className="btn-dodaj-aktivnost" onClick={handleDodajAktivnost}>
          Dodaj Novu Aktivnost
        </button>
        <div className="aktivnosti-container">
          {aktivnosti.length === 0 ? (
            <p>Nema aktivnosti. Dodajte novu aktivnost.</p>
          ) : (
            aktivnosti.map((aktivnost) => (
              <div key={aktivnost.id} className="aktivnost-card">
                <h3>{aktivnost.naziv}</h3>
                <p>{aktivnost.komentar}</p>
                <small>{new Date(aktivnost.datum).toLocaleDateString()}</small>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default DnevnikDetails;
