import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Muscles from './Components/Muscles';
import DodajGrupu from './Components/DodajGrupu';
import Treneri from './Components/Treneri';
import Vezbaci from './Components/Vezbaci';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
