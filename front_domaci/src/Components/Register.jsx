import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Vezbac",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Šifre se ne poklapaju!");
      return;
    }
    setError("");
    console.log("Podaci o registraciji:", formData);
    alert("Uspešno ste se registrovali! Sada se možete prijaviti.");
    navigate("/");
  };

  return (
    <div className="register-container">
      <h1>Kreiraj Nalog</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Korisničko ime"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Šifra"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Ponovite šifru"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="Trener">Trener</option>
          <option value="Vezbac">Vežbač</option>
        </select>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="register-btn">
          Registruj se
        </button>
      </form>
      <div className="switch-to-login">
        Već imate nalog?{" "}
        <a onClick={() => navigate("/")} href="#">
          Prijavite se ovde
        </a>
      </div>
    </div>
  );
};

export default Register;
