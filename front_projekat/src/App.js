import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Muscles from './Components/Muscles';
import DodajGrupu from './Components/DodajGrupu';
import Treneri from './Components/Treneri';
import Vezbaci from './Components/Vezbaci';
import MuscleExercises from './Components/MuscleExercises';
import ExerciseDetails from './Components/ExerciseDetails';
import TrainingPlan from './Components/TrainingPlan';
import AddExercise from './Components/AddExercise';
import MojDnevnik from './Components/MojDnevnik';
import DodajNoviDnevnik from './Components/DodajNoviDnevnik';
import DnevnikDetails from './Components/DnevnikDetails';
import DodajAktivnost from './Components/DodajAktivnost';
import PlansPage from './Components/PlansPage';
import PlanDetailsPage from './Components/PlanDetailsPage';
import YouTube from './Components/Youtube';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/register" element={<Register />} /> 
          <Route path="/muscle-group" element={<Muscles />} /> 
          <Route path="/add-group" element={<DodajGrupu />} /> 
          <Route path="/treneri" element={<Treneri />} /> 
          <Route path="/vezbaci" element={<Vezbaci />} /> 
          <Route path="/grupa/:muscleGroupId" element={<MuscleExercises />} /> 
          <Route path="/exercise/:exerciseId" element={<ExerciseDetails />} /> 
           <Route path="/kreiraj-plan" element={<TrainingPlan />} /> 
          <Route path="/dodaj-vezbu" element={<AddExercise />} /> 
           <Route path="/moj-dnevnik" element={<MojDnevnik />} /> 
          <Route path="/dodaj-dnevnik" element={<DodajNoviDnevnik />} /> 
          <Route path="/dnevnik/:dnevnikId" element={<DnevnikDetails />} />
          <Route path="/dodaj-aktivnost/:dnevnikId" element={<DodajAktivnost />} />
           <Route path="/planovi" element={<PlansPage />} /> 
          <Route path="/plan/:planId" element={<PlanDetailsPage />} />
          <Route path="/youtube" element={<YouTube />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
