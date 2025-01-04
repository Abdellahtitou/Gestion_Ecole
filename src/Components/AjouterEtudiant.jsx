import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const AjouterEtudiant = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance , setDateNaissance ] = useState('');
  const [email, setEmail] = useState('');
  const [Mot_De_Passe, setMot_De_Passe] = useState('');
  const [classe, setClasse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3002/etudiants', { nom, prenom, dateNaissance, classe });
      alert('Étudiant inscrit avec succès!');

      setNom('');
      setPrenom('');
      setDateNaissance('');
      setClasse('');
    } catch (error) {
      console.error('Erreur lors de l\'inscription de l\'étudiant:', error);
    }
    try{
      await axios.post('http://localhost:3002/authentication_Etudiants', { email, Mot_De_Passe});
      alert('authentication_Etudiants inscrit avec succès!');
      setEmail('');
      setMot_De_Passe('');
    } catch (error) {
      console.error('Erreur lors de l\'inscription de l\'étudiant:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Enregistrer un nouvel étudiant</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nom" className="block text-gray-700 font-semibold mb-2">Nom</label>
          <input
            type="text"
            id="nom"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Entrez le nom de l'étudiant"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="prenom" className="block text-gray-700 font-semibold mb-2">Prénom</label>
          <input
            type="text"
            id="prenom"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Entrez le prénom de l'étudiant"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dateNaissance" className="block text-gray-700 font-semibold mb-2">Date de naissance</label>
          <input
            type="date"
            id="dateNaissance"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={dateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
            required
          />
          </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </div>
          <div className="mb-4">
          <label htmlFor="Mot_De_Passe" className="block text-gray-700 font-semibold mb-2">Mot_De_Passe</label>
          <input
            type="password"
            id="Mot_De_Passe"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={Mot_De_Passe}
            onChange={(e) => setMot_De_Passe(e.target.value)}
            required
          />
          </div>
        <div className="mb-4">
          <label htmlFor="classe" className="block text-gray-700 font-semibold mb-2">Classe</label>
          <input
            type="text"
            id="classe"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Entrez la classe de l'étudiant"
            value={classe}
            onChange={(e) => setClasse(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Enregistrer</button>
      </form>
      <Link to={`/Administrateur`} className="mt-8 text-blue-500 hover:underline">Revenir</Link>
    </div>
  );
};

export default AjouterEtudiant;
