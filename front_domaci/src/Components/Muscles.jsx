import React from 'react';
import { Link } from 'react-router-dom';
import './Muscles.css';
import Navigation from './Navigation';
import Footer from './Footer';

const muscleGroups = [
  { id: 1, name: "Grudi", description: "Vežbe za jačanje grudi.", image: "/images/muscles/chest.jpg" },
  { id: 2, name: "Leđa", description: "Vežbe za leđa i donji deo kičme.", image: "/images/muscles/back.jpg" },
  { id: 3, name: "Noge", description: "Vežbe za jačanje nogu i kvadricepsa.", image: "/images/muscles/legs.jpg" },
  { id: 4, name: "Ramena", description: "Vežbe za ramena i gornji deo tela.", image: "/images/muscles/shoulder.jpg" },
  { id: 5, name: "Biceps", description: "Vežbe za jačanje bicepsa.", image: "/images/muscles/biceps.jpg" }, 
  { id: 6, name: "Triceps", description: "Vežbe za jačanje tricepsa.", image: "/images/muscles/triceps.jpg" }, 
  { id: 7, name: "Stomak", description: "Vežbe za jačanje trbušnih mišića.", image: "/images/muscles/abs.jpg" }, 
  { id: 8, name: "Kardio", description: "Vežbe za poboljšanje kardiovaskularne kondicije i sagorevanje kalorija.", image: "/images/muscles/cardio.jpg" },
];

const Muscles = () => {
  return (
    <>
      <Navigation />
      <div className="home-container">
        <h1>Grupe Mišića</h1>
        <div className="muscle-groups">
          {muscleGroups.map(group => (
            <div key={group.id} className="muscle-card">
              <img src={group.image} alt={group.name} className="muscle-image" />
              <h3>{group.name}</h3>
              <p>{group.description}</p>
              <Link to={`/grupa/${group.id}`} className="details-link">
                Pogledaj detalje
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Muscles;
