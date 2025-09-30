import React, { useState } from "react";
import './TrainingPlan.css';
import Navigation from "./Navigation";
import Footer from "./Footer";

const TrainingPlan = () => {
  const [planName, setPlanName] = useState("");
  const [date, setDate] = useState("");
  const [exercises, setExercises] = useState([]);

  const availableExercises = [
    "Bench Press", "Squat", "Deadlift", "Pull-up", "Push-up", "Overhead Press", "Leg Press", "Lunges", 
    "Bicep Curls", "Hammer Curls", "Tricep Dips", "Overhead Tricep Extension", 
    "Plank", "Bicycle Crunches", "Trčanje", "Burpees"
];

  const handleAddExercise = () => {
    setExercises([...exercises, { exercise: "", sets: "", reps: "" }]);
  };

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const planData = {
      name: planName,
      date: date,
      exercises: exercises
    };
    console.log(planData);
  };

  return (
    <>
        <Navigation/>
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
                <select 
                    value={exercise.exercise} 
                    onChange={(e) => handleExerciseChange(index, "exercise", e.target.value)}
                >
                    <option value="">Izaberite vežbu</option>
                    {availableExercises.map((ex, idx) => (
                    <option key={idx} value={ex}>{ex}</option>
                    ))}
                </select>
                <input 
                    type="number" 
                    value={exercise.sets} 
                    placeholder="Broj serija" 
                    onChange={(e) => handleExerciseChange(index, "sets", e.target.value)} 
                    min="1" 
                />
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
        <Footer/>
    </>
    
  );
};

export default TrainingPlan;
