import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AjouterProfesseur = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [Mot_De_Passe, setMot_De_Passe] = useState('');
  const [matiere, setMatiere] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/Professeurs', { 
        nom, 
        prenom, 
        email, 
        Mot_De_Passe, 
        matiere 
      });
      alert(response.data.message);
      setNom('');
      setPrenom('');
      setEmail('');
      setMot_De_Passe('');
      setMatiere('');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      alert('Erreur lors de l\'inscription du professeur');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Enregistrer un nouveau Professeur</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nom" className="block text-gray-700 font-semibold mb-2">Nom</label>
          <input
            type="text"
            id="nom"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Entrez le nom du Professeur"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required />
        </div>
        <div className="mb-4">
          <label htmlFor="prenom" className="block text-gray-700 font-semibold mb-2">Prénom</label>
          <input
            type="text"
            id="prenom"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Entrez le prénom du Professeur"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required/>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Entrez l'email du Professeur"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>
        <div className="mb-4">
          <label htmlFor="Mot_De_Passe" className="block text-gray-700 font-semibold mb-2">Mot de passe</label>
          <input
            type="password"
            id="Mot_De_Passe"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Entrez le mot de passe du Professeur"
            value={Mot_De_Passe}
            onChange={(e) => setMot_De_Passe(e.target.value)}
            required/>
        </div>
        <div className="mb-4">
          <label htmlFor="matiere" className="block text-gray-700 font-semibold mb-2">Matière</label>
          <input
            type="text"
            id="matiere"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Entrez la matière du Professeur"
            value={matiere}
            onChange={(e) => setMatiere(e.target.value)}
            required/>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Enregistrer</button>
      </form>
      <Link to={`/Administrateur`} className="mt-8 text-blue-500 hover:underline">Revenir</Link>
    </div>
  );
};

export default AjouterProfesseur;

