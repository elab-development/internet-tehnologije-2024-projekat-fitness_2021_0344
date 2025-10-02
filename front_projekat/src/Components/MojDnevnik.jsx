import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MojDnevnik.css';
import Navigation from './Navigation';
import axios from 'axios';

const MojDnevnik = () => {
  const [dnevnici, setDnevnici] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const postsPerPage = 10;
  const navigate = useNavigate();


  useEffect(() => {
    const fetchDnevnici = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/vezbaci/dnevnici', {
          params: {
            page: pagination.currentPage,
            per_page: postsPerPage,
          },
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
          }
        });

        
        setDnevnici(response.data.data); 

   
        setPagination({
          currentPage: response.data.meta.current_page,
          totalPages: response.data.meta.last_page,
          totalItems: response.data.meta.total,
        });
      } catch (error) {
        console.error('Error loading dnevnik:', error);
      }
    };

    fetchDnevnici();
  }, [pagination.currentPage]); 


  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination(prev => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination(prev => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };

  const handleOpenDnevnik = (id) => {
 
    navigate(`/dnevnik/${id}`);
  };

  return (
    <>
      <Navigation />
      <div className="moj-dnevnik-container">
        <h1>Moj Dnevnik</h1>
        <div className="dnevnik-list">
          {dnevnici.length === 0 ? (
            <p>Nema dnevnika. Dodajte novi dnevnik.</p>
          ) : (
            dnevnici.map((dnevnik) => (
              <div
                key={dnevnik.id}
                className="dnevnik-card"
                onClick={() => handleOpenDnevnik(dnevnik.id)}
              >
                <div className="dnevnik-details">
                  <h3>{dnevnik.naslov}</h3>
                  <p>{dnevnik.kratak_opis}</p>
                </div>
              </div>
            ))
          )}
        </div>

 
        <div className="pagination">
          <button
            onClick={handlePrevPage}
            disabled={pagination.currentPage === 1}
            className="pagination-button"
          >
            Prethodna
          </button>
          <span className="pagination-info">
            Stranica {pagination.currentPage} od {pagination.totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={pagination.currentPage === pagination.totalPages}
            className="pagination-button"
          >
            Sledeća
          </button>
        </div>
      </div>
    </>
  );
};

export default MojDnevnik;
