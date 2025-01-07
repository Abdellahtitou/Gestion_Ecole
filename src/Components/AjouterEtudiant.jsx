import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const AjouterEtudiant = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [email, setEmail] = useState('');
  const [Mot_De_Passe, setMot_De_Passe] = useState('');
  const [classe, setClasse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/Etudiants', { 
        nom, 
        prenom, 
        dateNaissance,
        email, 
        Mot_De_Passe, 
        classe 
      });
      alert(response.data.message);
      setNom('');
      setPrenom('');
      setDateNaissance('');
      setEmail('');
      setMot_De_Passe('');
      setClasse('');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      alert('Erreur lors de l\'inscription de l\'étudiant');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Enregistrer un nouvel étudiant</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: 'Nom', value: nom, setter: setNom },
          { label: 'Prénom', value: prenom, setter: setPrenom },
          { label: 'Date de naissance', value: dateNaissance, setter: setDateNaissance, type: 'date' },
          { label: 'Email', value: email, setter: setEmail, type: 'email' },
          { label: 'Mot de passe', value: Mot_De_Passe, setter: setMot_De_Passe, type: 'password' },
          { label: 'Classe', value: classe, setter: setClasse },
        ].map(({ label, value, setter, type = 'text' }) => (
          <div className="mb-4" key={label}>
            <label htmlFor={label} className="block text-gray-700 font-semibold mb-2">
              {label}
            </label>
            <input
              type={type}
              id={label}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder={`Entrez ${label.toLowerCase()} de l'étudiant`}
              value={value}
              onChange={(e) => setter(e.target.value)}
              required
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Enregistrer
        </button>
      </form>
      <Link to="/Administrateur" className="mt-8 text-blue-500 hover:underline">
        Revenir
      </Link>
    </div>
  );
};

export default AjouterEtudiant;
