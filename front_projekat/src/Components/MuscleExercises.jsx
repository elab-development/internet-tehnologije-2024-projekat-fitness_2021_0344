import React, { useState, useEffect } from 'react';
import { useParams, useNavigate,Link } from 'react-router-dom';
import axios from 'axios';  
import Navigation from './Navigation';
import './MuscleExercises.css';

const MuscleExercises = () => {
  const { muscleGroupId } = useParams();
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isTrainer, setIsTrainer] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
   
    axios.get('http://localhost:8000/api/kategorije-vezbe', {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
      },
    })
    .then((response) => {
      setCategories(response.data.data);  
    })
    .catch((error) => {
      console.error('Greška pri učitavanju kategorija:', error);
    });

    
    const role = sessionStorage.getItem('role');
    if (role === 'trener') {
      setIsTrainer(true);
    }

    loadExercises();
  }, [muscleGroupId]);


  const loadExercises = () => {
    const params = selectedCategory ? { kategorija_id: selectedCategory } : {};  // Dodajemo parametar ako je selektovana kategorija

    axios.get(`http://localhost:8000/api/grupe-misica/${muscleGroupId}`, {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
      },
      params,
    })
    .then((response) => {
      setFilteredExercises(response.data.data.vezbe); 
    })
    .catch((error) => {
      console.error('Greška pri učitavanju vežbi:', error);
    });
  };

 
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };


  const handleFilterChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    loadExercises(); 
  }, [selectedCategory, muscleGroupId]);

  return (
    <>
      <Navigation />
      <div className="exercises-container">
        <div className="sidebar">
          <h3>Filter vežbi</h3>
          <select onChange={handleCategoryChange} value={selectedCategory}>
            <option value="">Sve</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.naziv}
              </option>
            ))}
          </select>
        </div>

        <div className="exercises-list">
          <h1>Vežbe za Grupu Mišića</h1>
          {isTrainer && (
            <button className="add-exercise-btn" onClick={() => navigate('/dodaj-vezbu', { state: { muscleGroupId } })}>Dodaj Vezbu</button>
          )}
          <div className="exercise-cards">
            {filteredExercises.map((exercise) => (
              <div key={exercise.id} className="exercise-card">
                <img src={exercise.slika} alt={exercise.naziv} className="exercise-image" />
                <h3>{exercise.naziv}</h3>
                <p>{exercise.opis}</p>
                <Link to={`/exercise/${exercise.id}`} className="details-link">Pogledaj detalje</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MuscleExercises;
