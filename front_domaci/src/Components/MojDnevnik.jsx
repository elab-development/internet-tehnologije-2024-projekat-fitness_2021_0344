import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MojDnevnik.css';
import Navigation from './Navigation';
import Footer from './Footer';

const MojDnevnik = () => {
  const [dnevnici, setDnevnici] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   
    const korisnickiDnevnici = [
      {
        id: 1,
        naziv: 'Dnevnik za merenje težine',
        kratakOpis: 'Prati napredak u merenju težine tokom vremena.',
        aktivnosti: [
          { id: 1, naziv: 'Trčanje', komentar: 'Brzo trčanje na stazi 5 km.', datum: '2025-01-06' },
          { id: 2, naziv: 'Merenje težine', komentar: 'Merenje težine: 70 kg', datum: '2025-01-07' },
        ],
      },
      {
        id: 2,
        naziv: 'Dnevnik za brojeve ponavljanja',
        kratakOpis: 'Beleži broj ponavljanja na bodyweight vežbama.',
        aktivnosti: [
          { id: 1, naziv: 'Sklekovi', komentar: '20 ponavljanja', datum: '2025-01-06' },
          { id: 2, naziv: 'Sklekovi', komentar: '25 ponavljanja', datum: '2025-01-07' },
        ],
      },
      {
        id: 3,
        naziv: 'Dnevnik za snagu',
        kratakOpis: 'Prati napredak u vežbama snage sa tegovima.',
        aktivnosti: [
          { id: 1, naziv: 'Deadlift', komentar: '100 kg x 5 ponavljanja', datum: '2025-01-06' },
          { id: 2, naziv: 'Deadlift', komentar: '105 kg x 5 ponavljanja', datum: '2025-01-07' },
        ],
      },
    ];
    setDnevnici(korisnickiDnevnici);
  }, []);

  const handleOpenDnevnik = (dnevnik) => {
    navigate(`/dnevnik/${dnevnik.id}`, { state: { dnevnik } });
  };

  return (
    <>
      <Navigation />
      <div className="moj-dnevnik-container">
        <h1>Moj Dnevnik</h1>
        <div className="dnevnik-list">
          {dnevnici.length === 0 ? (
            <p>Nema dnevnika. Dodajte novi dnevnik.</p>
          ) : (
            dnevnici.map((dnevnik) => (
              <div
                key={dnevnik.id}
                className="dnevnik-card"
                onClick={() => handleOpenDnevnik(dnevnik)}
              >
                <div className="dnevnik-details">
                  <h3>{dnevnik.naziv}</h3>
                  <p>{dnevnik.kratakOpis}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default MojDnevnik;
