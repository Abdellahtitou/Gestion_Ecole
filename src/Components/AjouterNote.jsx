import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddNoteForm = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3002/etudiants').then((res) => {
      setEtudiants(res.data);
    });
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    setNotes((prevNotes) => ({
      ...prevNotes,
      [index]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const notesToSubmit = etudiants.map((etudiant, index) => ({
        nom: etudiant.nom,
        prenom: etudiant.prenom,
        note: notes[index] || '', 
      }));

      await axios.post('http://localhost:3002/notes', notesToSubmit);
      alert('Notes ajoutées avec succès.');
    } catch (err) {
      console.error('Erreur lors de l\'ajout des notes :', err);
      alert('Erreur lors de l\'ajout des notes. Veuillez réessayer.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Ajouter des notes</h2>
      <form onSubmit={handleSubmit}>
        <table className="min-w-full divide-y divide-gray-200 mb-6">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Prénom</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Note</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {etudiants.map((etudiant, index) => (
              <tr key={index} className="hover:bg-gray-100 transition duration-150 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{etudiant.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{etudiant.prenom}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    name={`note-${index}`}
                    value={notes[index] || ''}
                    onChange={(e) => handleInputChange(e, index)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Enregistrer
          </button>
        </div>
      </form>
      <Link to="/Professeur" className="block text-center mt-4 text-indigo-600 hover:text-indigo-900 hover:underline">
        Revenir
      </Link>
    </div>
  );
};

export default AddNoteForm;
