import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/register" element={<Register />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
