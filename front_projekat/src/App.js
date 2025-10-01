import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Muscles from './Components/Muscles';
import DodajGrupu from './Components/DodajGrupu';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/register" element={<Register />} /> 
          <Route path="/muscle-group" element={<Muscles />} /> 
          <Route path="/add-group" element={<DodajGrupu />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
