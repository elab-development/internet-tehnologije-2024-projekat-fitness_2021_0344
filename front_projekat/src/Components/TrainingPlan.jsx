import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './TrainingPlan.css'; 
import Navigation from "./Navigation";
import axios from 'axios';

const TrainingPlan = () => {
  
  const [planName, setPlanName] = useState("");
    const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [exercises, setExercises] = useState([]);
  const [availableExercises, setAvailableExercises] = useState([]);

  
  useEffect(() => {
    axios.get('http://localhost:8000/api/vezbe', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`,
      },
    } ) 
      .then(response => {
        setAvailableExercises(response.data.data); 
      })
      .catch(error => {
        console.error("Greška pri učitavanju vežbi:", error);
      });
  }, []);

 
  const handleAddExercise = () => {
    setExercises([...exercises, { id: "", sets: "", reps: "" }]);
  };


  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
  
   
    if (field === "exercise") {
      const selectedExercise = availableExercises.find(ex => ex.naziv === value);
      if (selectedExercise) {
        newExercises[index].id = selectedExercise.id; 
        newExercises[index].sets = selectedExercise.preporuceni_broj_serija;
        newExercises[index].reps = selectedExercise.preporuceni_broj_ponavljanja;
      } else {
        
        newExercises[index].id = "";
        newExercises[index].sets = "";
        newExercises[index].reps = "";
      }
    }
    
    setExercises(newExercises);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const planData = {
      naziv: planName,
      datum: date,
      vezbe: exercises.map(exercise => ({
        id: exercise.id,
        broj_serija: exercise.sets,
        broj_ponavljanja: exercise.reps,
      })),
    };
    console.log(planData);
  
    axios.post('http://localhost:8000/api/plan-treninga', planData, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`, 
      },
    } ) 
      .then(response => {
        console.log("Plan uspešno sačuvan:", response);
        alert('Uspesno sacuvan plan treninga');
        navigate('/planovi')
      })
      .catch(error => {
        console.error("Greška pri slanju plana:", error);
        alert('Doslo je do greske prilikom cuvanja plana treninga');
      });
  };

  return (
    <>
      <Navigation />
      <div className="training-plan">
        <h1>Kreiraj dnevni plan</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Datum plana:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
  
          <div>
            <label>Naziv plana:</label>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="Unesite naziv plana"
            />
          </div>
  
          <div className="exercise-list">
            <h3>Vežbe za dan</h3>
            {exercises.map((exercise, index) => (
              <div key={index} className="exercise-item">
                <label>Vežba:</label>
                <select
                  value={exercise.exercise}
                  onChange={(e) => handleExerciseChange(index, "exercise", e.target.value)}
                >
                  <option value="">Izaberite vežbu</option>
                  {availableExercises.map((ex, idx) => (
                    <option key={idx} value={ex.naziv}>{ex.naziv}</option>
                  ))}
                </select>
                <label>Broj serija:</label>
                <input
                  type="number"
                  value={exercise.sets}
                  placeholder="Broj serija"
                  onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
                  min="1"
                />
                <label>Broj ponavljanja:</label>
                <input
                  type="number"
                  value={exercise.reps}
                  placeholder="Broj ponavljanja"
                  onChange={(e) => handleExerciseChange(index, "reps", e.target.value)}
                  min="1"
                />
              </div>
            ))}
          </div>
  
          <button type="button" onClick={handleAddExercise}>Dodaj vežbu</button>
          <button type="submit">Sačuvaj plan</button>
        </form>
      </div>
    </>
  );
  
};

export default TrainingPlan;
