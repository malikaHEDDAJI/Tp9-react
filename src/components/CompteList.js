import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const CompteList = forwardRef((props, ref) => {
  const [comptes, setComptes] = useState([]);

  // Fonction pour récupérer les comptes
  const fetchComptes = () => {
    axios.get(`${API_BASE_URL}/comptes`)
      .then(response => setComptes(response.data))
      .catch(error => console.error(error));
  };

  // Exposer fetchComptes au parent via ref
  useImperativeHandle(ref, () => ({
    fetchComptes
  }));

  useEffect(() => {
    fetchComptes();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Liste des Comptes</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Solde</th>
            <th>Date de Création</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {comptes.map(compte => (
            <tr key={compte.id}>
              <td>{compte.id}</td>
              <td>{compte.solde}</td>
              <td>{compte.dateCreation}</td>
              <td>{compte.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default CompteList;
