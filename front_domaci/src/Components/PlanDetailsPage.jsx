import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PlanDetailsPage.css';
import Navigation from './Navigation';
import Footer from './Footer';

const PlanDetailsPage = () => {
    const { planId } = useParams(); 
    const navigate = useNavigate();

    const userPlans = [
      {
        id: 1,
        date: '2025-01-10',
        name: 'Plan za jačanje nogu',
        exercises: [
          { id: 5, name: 'Čučnjevi', sets: 4, reps: 12 },
          { id: 7, name: 'Iskoraci', sets: 3, reps: 10 },
          { id: 6, name: 'Leg Press', sets: 4, reps: 15 },
        ],
      },
      {
        id: 2,
        date: '2025-01-08',
        name: 'Plan za gornji deo tela',
        exercises: [
          { id: 1, name: 'Bench Press', sets: 4, reps: 8 },
          { id: 4, name: 'Zgibovi', sets: 3, reps: 10 },
          { id: 8, name: 'Rameni Potisak', sets: 4, reps: 12 },
        ],
      },
      {
        id: 3,
        date: '2025-01-05',
        name: 'Kardio i izdržljivost',
        exercises: [
          { id: 16, name: 'Trčanje', sets: 1, reps: 5 },
          { id: 15, name: 'Plank', sets: 3, reps: 60 },
          { id: 17, name: 'Burpees', sets: 3, reps: 15 },
        ],
      },
    ];

    const selectedPlan = userPlans.find((plan) => plan.id === parseInt(planId));

    if (!selectedPlan) {
      return <p>Plan nije pronađen!</p>;
    }

    return (
      <>
          <Navigation/>
          <div className="plan-details-page">
        <h1>{selectedPlan.name}</h1>
        <p><strong>Datum:</strong> {selectedPlan.date}</p>
        <h2>Vežbe:</h2>
        <div className="exercises-list">
          {selectedPlan.exercises.map((exercise) => (
            <div key={exercise.id} className="exercise-item">
              <a 
                href={`/exercise/${exercise.id}`} 
                className="exercise-link"
              >
                {exercise.name}
              </a>
              <p><strong>Serije:</strong> {exercise.sets}</p>
              <p><strong>Ponavljanja:</strong> {exercise.reps}</p>
            </div>
          ))}
        </div>
        <button className="back-btn" onClick={() => navigate(-1)}>
          Nazad
        </button>
      </div>
      <Footer/>
    </>
    
  );
};

export default PlanDetailsPage;
