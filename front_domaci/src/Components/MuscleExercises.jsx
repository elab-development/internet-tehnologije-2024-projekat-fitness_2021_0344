import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import './MuscleExercises.css';
import Footer from './Footer';


const exercisesData = {
  1: [  
    { id: 1, name: 'Bench Press', type: 'Vezbe sa sipkom', description: 'Vežba za grudi, koristi se šipka.', image: '/images/benchpress.jpg' },
    { id: 2, name: 'Push-ups', type: 'Calisthenics', description: 'Klasične sklekove za grudi.', image: '/images/pushups.jpg' },
  ],
  2: [  
    { id: 3, name: 'Deadlift', type: 'Vezbe sa sipkom', description: 'Vežba za leđa i noge sa šipkom.', image: '/images/deadlift.jpg' },
    { id: 4, name: 'Pull-ups', type: 'Calisthenics', description: 'Vežba za leđa koristeći telesnu težinu.', image: '/images/pullups.jpg' },
  ],
  3: [ 
    { id: 5, name: 'Squat', type: 'Vezbe sa sipkom', description: 'Vežba za noge sa šipkom.', image: '/images/squat.jpg' },
    { id: 6, name: 'Leg Press', type: 'Vezbe na masinama', description: 'Vežba za noge na spravi.', image: '/images/legpress.jpg' },
    { id: 7, name: 'Lunges', type: 'Vezbe sa bucicama', description: 'Vežba za noge sa bucicama.', image: '/images/lunges.jpg' },
  ],
  4: [ 
    { id: 8, name: 'Overhead Press', type: 'Vezbe sa sipkom', description: 'Vežba za jačanje ramena koristeći šipku ili bučice.', image: '/images/overhead_press.jpg' }, 
    { id: 9, name: 'Lateral Raises', type: 'Izolacione vežbe', description: 'Vežba za razvijanje bočnih delova ramena koristeći bučice.', image: '/images/lateral_raises.jpg'},
  ],
  5: [
    { id: 10, name: 'Bicep Curls', type: 'Izolacione vežbe', description: 'Vežba za jačanje bicepsa koristeći bučice ili šipku.', image: '/images/bicep_curls.jpg' },
    { id: 11, name: 'Hammer Curls', type: 'Izolacione vežbe', description: 'Vežba za jačanje bicepsa i podlaktica koristeći bučice.', image: '/images/hammer_curls.jpg' }
  ],
  6: [ 
      { id: 12, name: 'Tricep Dips', type: 'Bodyweight vežbe', description: 'Vežba za jačanje tricepsa koristeći telesnu težinu.', image: '/images/tricep_dips.jpg' },
      { id: 13, name: 'Overhead Tricep Extension', type: 'Izolacione vežbe', description: 'Vežba za jačanje tricepsa koristeći bučice ili šipku.', image: '/images/overhead_tricep_extension.jpg' }
  ],
  7: [ 
    { id: 14, name: 'Plank', type: 'Bodyweight vežbe', description: 'Vežba za jačanje jezgra, uključujući trbušne mišiće i donji deo leđa.', image: '/images/plank.jpg' },
    { id: 15, name: 'Bicycle Crunches', type: 'Bodyweight vežbe', description: 'Efikasna vežba za trbušne mišiće sa fokusom na kosim mišićima.', image: '/images/bicycle_crunches.jpg' }
  ],
  8: [ 
    { id: 16, name: 'Trčanje', type: 'Kardio vežbe', description: 'Osnovna kardio vežba koja poboljšava izdržljivost i kondiciju.', image: '/images/running.jpg' },
    { id: 17, name: 'Burpees', type: 'Kombinovane vežbe', description: 'Visoko intenzivna vežba koja aktivira celo telo i podiže puls.', image: '/images/burpees.jpg' }
  ],
};

const MuscleExercises = () => {
  const { muscleGroupId } = useParams();
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [isTrainer, setIsTrainer] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    if (role === 'trener') {
      setIsTrainer(true);
    }

    if (muscleGroupId && exercisesData[muscleGroupId]) {
      setFilteredExercises(exercisesData[muscleGroupId]);
    }
  }, [muscleGroupId]);

  const handleFilterChange = (e) => {
    setSelectedType(e.target.value);
  };

  const filteredData = selectedType === 'All' 
    ? filteredExercises 
    : filteredExercises.filter(exercise => exercise.type === selectedType);

  const handleAddExercise = () => {
    navigate('/dodaj-vezbu'); 
  };

  return (
    <>
      <Navigation />
      <div className="exercises-container">
        <div className="sidebar">
          <h3>Filter vežbi</h3>
          <select onChange={handleFilterChange} value={selectedType}>
            <option value="All">Sve</option>
            <option value="Calisthenics">Calisthenics</option>
            <option value="Vezbe sa bucicama">Vezbe sa bucicama</option>
            <option value="Vezbe sa sipkom">Vezbe sa sipkom</option>
            <option value="Vezbe na masinama">Vezbe na masinama</option>
          </select>
        </div>

        <div className="exercises-list">
          <h1>Vežbe za Grupu Mišića</h1>
          {isTrainer && (
            <button className="add-exercise-btn" onClick={handleAddExercise}>Dodaj Vezbu</button>
          )}
          <div className="exercise-cards">
            {filteredData.map((exercise) => (
              <div key={exercise.id} className="exercise-card">
                <img src={exercise.image} alt={exercise.name} className="exercise-image" />
                <h3>{exercise.name}</h3>
                <p>{exercise.description}</p>
                <Link to={`/exercise/${exercise.id}`} className="details-link">Pogledaj detalje</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default MuscleExercises;
