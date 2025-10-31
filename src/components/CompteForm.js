import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteForm({ onCompteAdded }) {
  const [compte, setCompte] = useState({ solde: '', dateCreation: '', type: 'COURANT' });

  const handleChange = (e) => {
    setCompte({ ...compte, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const compteToSend = {
      ...compte,
      solde: parseFloat(compte.solde)
    };

    axios.post(`${API_BASE_URL}/comptes`, compteToSend)
      .then(response => {
        alert('Compte ajouté !');
        setCompte({ solde: '', dateCreation: '', type: 'COURANT' });

        // Rafraîchir la liste automatiquement
        if (onCompteAdded) onCompteAdded();
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter un Compte</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Solde</label>
          <input type="number" name="solde" className="form-control" value={compte.solde} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Date de Création</label>
          <input type="date" name="dateCreation" className="form-control" value={compte.dateCreation} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select name="type" className="form-select" value={compte.type} onChange={handleChange}>
            <option value="COURANT">Courant</option>
            <option value="EPARGNE">Épargne</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Ajouter</button>
      </form>
    </div>
  );
}

export default CompteForm;
