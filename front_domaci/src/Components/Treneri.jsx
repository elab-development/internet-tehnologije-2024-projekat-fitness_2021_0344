import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import "./Treneri.css";
import usePagination from "./usePagination";
import Pagination from "./Pagination"; 
import Footer from "./Footer";

const Treneri = () => {
  const [treneri, setTreneri] = useState([]);

  useEffect(() => {
    
    const fetchedTreneri = [
      { id: 1, ime: "Marko Marković", email: "marko@example.com" },
      { id: 2, ime: "Jovana Jovanović", email: "jovana@example.com" },
      { id: 3, ime: "Nikola Nikolić", email: "nikola@example.com" },
      { id: 4, ime: "Ana Anić", email: "ana@example.com" },
      { id: 5, ime: "Milan Milovanović", email: "milan@example.com" },
    ];
    setTreneri(fetchedTreneri);
  }, []);

  const handleDelete = (id) => {
    setTreneri(treneri.filter((trener) => trener.id !== id));
  };

  const { currentItems, currentPage, totalPages, handlePageChange } =
    usePagination(treneri, 2);

  return (
    <div>
      <Navigation />
      <div className="treneri-container">
        <h1>Lista Trenera</h1>
        <table className="treneri-table">
          <thead>
            <tr>
              <th>Ime</th>
              <th>Email</th>
              <th>Brisanje</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((trener) => (
              <tr key={trener.id}>
                <td>{trener.ime}</td>
                <td>{trener.email}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(trener.id)}
                  >
                    Obriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <Footer/>
    </div>
  );
};

export default Treneri;
