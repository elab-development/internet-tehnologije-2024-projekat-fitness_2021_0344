import React, { useState } from 'react';
import './DodajGrupu.css';
import Navigation from './Navigation';
import Footer from './Footer';

const DodajGrupu = () => {
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');
  const [slika, setSlika] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSlika(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newGroup = {
      naziv,
      opis,
      slika,
    };

    console.log(newGroup); 

    setNaziv('');
    setOpis('');
    setSlika(null);
  };

  return (
    <div  className="full">
        <Navigation/>
        <div className="dodaj-grupu-container">
        <h1>Dodaj Novu grupu mišića</h1>
        <form onSubmit={handleSubmit} className="dodaj-grupu-form">
            <div className="form-group">
            <label htmlFor="naziv">Naziv</label>
            <input
                type="text"
                id="naziv"
                value={naziv}
                onChange={(e) => setNaziv(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="opis">Opis</label>
            <textarea
                id="opis"
                value={opis}
                onChange={(e) => setOpis(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="slika">Slika</label>
            <input
                type="file"
                id="slika"
                accept="image/*"
                onChange={handleImageChange}
            />
            {slika && <img src={slika} alt="Prethodna slika" className="preview-image" />}
            </div>
            <button type="submit" className="submit-button">Dodaj Grupu</button>
        </form>
        </div>
        <Footer/>
    </div>
  );
};

export default DodajGrupu;
