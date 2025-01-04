import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import Accueil from './Components/Accueil';
import AccountA from './Components/AccountA';
import AjouterEtudiant from './Components/AjouterEtudiant';
import Etudiant from './Components/Etudiant';
import Administrateur from './Components/Administrateur';
import AjouterProfesseur from './Components/AjouterProfesseur';
import AccountE from './Components/AccountE';
import AccountP from './Components/AccountP';
import Professeur from './Components/Professeur';
import AjouterNote from './Components/AjouterNote';
import AjouterAbsence from './Components/AjouterAbsence';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/AccountA" element={<AccountA />} />
        <Route path="/AjouterEtudiant" element={<AjouterEtudiant />} />
        <Route path="/Etudiant" element={<Etudiant />} />
        <Route path="/Administrateur" element={<Administrateur />} />
        <Route path="/AjouterProfesseur" element={<AjouterProfesseur />} />
        <Route path="/AccountE" element={<AccountE />} />
        <Route path="/AccountP" element={<AccountP />} />
        <Route path="/Professeur" element={<Professeur />} />
        <Route path="/AjouterNote" element={<AjouterNote />} />
        <Route path="/AjouterAbsence" element={<AjouterAbsence />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
