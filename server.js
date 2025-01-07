const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'votre_clé_secrète';

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/HelloLife', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ProfesseurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  Mot_De_Passe: { type: String, required: true },
  matiere: { type: String, required: true },
});
const Professeur = mongoose.model('Professeur', ProfesseurSchema);

const EtudiantSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  dateNaissance: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  Mot_De_Passe: { type: String, required: true },
  classe: { type: String, required: true },
});
const Etudiant = mongoose.model('Etudiant', EtudiantSchema);

const AdministrateurSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  Mot_De_Passe: { type: String, required: true },
});
const Administrateur = mongoose.model('Administrateur', AdministrateurSchema);

const noteSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  note: { type: Number, required: true, min: 0, max: 20 }, 
});
const Note = mongoose.model('Note', noteSchema);

const Absence = mongoose.model('Absence', {
  nom: String,
  prenom: String,
  date_absence: Date,
  status: String,
});

app.post('/administrateurs', async (req, res) => {
  const {email, Mot_De_Passe} = req.body;
  try {
      const hashedPassword = await bcrypt.hash(Mot_De_Passe, 10);
      const administrateur = new Administrateur({email, Mot_De_Passe: hashedPassword});
      await administrateur.save();
      res.status(201).send({ message: 'Inscription réussie', administrateur });
  } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      res.status(500).send('Erreur serveur');
  }
});
app.post('/authentication_Administrateurs', async (req, res) => {
  const { email, Mot_De_Passe } = req.body;
  try {
    const administrateur = await Administrateur.findOne({ email });
    if (!administrateur) return res.status(404).send({ message: 'Email non trouvé' });
    const isPasswordValid = await bcrypt.compare(Mot_De_Passe, administrateur.Mot_De_Passe);
    if (!isPasswordValid) return res.status(401).send({ message: 'Mot de passe incorrect' });
    const token = jwt.sign({ id: administrateur._id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({ message: 'Connexion réussie', token });
  } catch (error) {
    console.error("Erreur lors de l'authentification:", error);
    res.status(500).send({ message: 'Erreur serveur' });
  }
});
app.post('/Etudiants', async (req, res) => {
  const { nom, prenom, dateNaissance, email, Mot_De_Passe, classe } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(Mot_De_Passe, 10);
    const newEtudiant = new Etudiant({nom,prenom,dateNaissance,email,Mot_De_Passe: hashedPassword,classe,});
    await newEtudiant.save();
    res.status(201).send({ message: 'Étudiant inscrit avec succès' });
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'étudiant:", error);
    res.status(500).send({ message: 'Erreur lors de l\'inscription de l\'étudiant' });
  }
});
app.post('/authentication_etudiants', async (req, res) => {
  const { email, Mot_De_Passe } = req.body;
  try {
    const etudiant = await Etudiant.findOne({ email });
    if (!etudiant) return res.status(404).send({ message: 'Email non trouvé' });
    const isPasswordValid = await bcrypt.compare(Mot_De_Passe, etudiant.Mot_De_Passe);
    if (!isPasswordValid) return res.status(401).send({ message: 'Mot de passe incorrect' });
    const token = jwt.sign({ id: etudiant._id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({ message: 'Connexion réussie', token });
  } catch (error) {
    console.error("Erreur lors de l'authentification:", error);
    res.status(500).send({ message: 'Erreur serveur' });
  }
});
app.get('/etudiants', async (req, res) => {
  try {
    const etudiants = await Etudiant.find({}, 'nom prenom');
    res.json(etudiants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
});
app.post('/professeurs', async (req, res) => {
  const { nom, prenom, email, Mot_De_Passe, matiere } = req.body;
  try {
      const hashedPassword = await bcrypt.hash(Mot_De_Passe, 10);
      const professeur = new Professeur({ nom, prenom, email, Mot_De_Passe: hashedPassword, matiere });
      await professeur.save();
      res.status(201).send({ message: 'Inscription réussie', professeur });
  } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      res.status(500).send('Erreur serveur');
  }
});
app.post('/authentication_Professeurs', async (req, res) => {
  const { email, Mot_De_Passe } = req.body;
  try {
    const professeur = await Professeur.findOne({ email });
    if (!professeur) return res.status(404).send({ message: 'Email non trouvé' });
    const isPasswordValid = await bcrypt.compare(Mot_De_Passe, professeur.Mot_De_Passe);
    if (!isPasswordValid) return res.status(401).send({ message: 'Mot de passe incorrect' });
    const token = jwt.sign({ id: professeur._id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({ message: 'Connexion réussie', token });
  } catch (error) {
    console.error("Erreur lors de l'authentification:", error);
    res.status(500).send({ message: 'Erreur serveur' });
  }
});
app.post('/notes', async (req, res) => {
  const notes = req.body;
  if (!Array.isArray(notes) || notes.length === 0) {
    return res.status(400).json({ error: 'Invalid data format' });
  } try {
    const savedNotes = await Note.insertMany(notes);
    res.status(201).send(savedNotes);
  } catch (error) {
    console.error('Erreur lors de l\'ajout des notes :', error);
    res.status(500).send('Erreur lors de l\'ajout des notes. Veuillez réessayer.');
  }
});
app.post('/absences', async (req, res) => {
  const absences = req.body;
  if (!Array.isArray(absences) || absences.length === 0) {
    return res.status(400).json({ error: 'Invalid data format' });
  }
  try {
    const savedAbsences = await Absence.insertMany(absences);
    res.status(201).send(savedAbsences);
  } catch (error) {
    console.error('Erreur lors de l\'ajout des absences :', error);
    res.status(500).send('Erreur lors de l\'ajout des absences. Veuillez réessayer.');
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
