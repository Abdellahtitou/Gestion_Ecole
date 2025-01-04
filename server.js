const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(bodyParser.json());



mongoose.connect('mongodb://localhost:27017/HelloLife', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

    const Etudiant = mongoose.model('Etudiant', {
      nom: String,
      prenom: String,
      Date_Naissance: Date,
      classe: String,

    });
    const Authentication_Etudiant = mongoose.model('Authentication_Etudiant', {
      email: String,
      Mot_De_Passe: Number,

    });

    const Professeur = mongoose.model('Professeur', {
      nom: String,
      prenom: String,
      matiére: String,

    });

    const Authentication_Professeur = mongoose.model('Authentication_Professeur', {
      email: String,
      Mot_De_Passe: Number,

    });

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

    app.post('/etudiants', async (req, res) => {
      const { nom, prenom, Date_Naissance, classe } = req.body;
      try {
        const etudiant = new Etudiant({ nom, prenom, Date_Naissance, classe});
        await etudiant.save();
        res.status(201).send(etudiant);
      } catch (error) {
        console.error('Error enrolling Etudiant:', error);
        res.status(500).send('Error enrolling Etudiant');
      }
    });

    app.post('/authentication_Etudiants', async (req, res) => {
      const { email, Mot_De_Passe } = req.body;
      try {
        const authentication_Etudiant = new Authentication_Etudiant({email, Mot_De_Passe });
        await authentication_Etudiant.save();
        res.status(201).send(authentication_Etudiant);
      } catch (error) {
        console.error('Error enrolling Etudiant:', error);
        res.status(500).send('Error enrolling Etudiant');
      }
    });

    app.post('/professeurs', async (req, res) => {
      const { nom, prenom, matiére } = req.body;
      try {
        const professeur = new Professeur({ nom, prenom, matiére});
        await professeur.save();
        res.status(201).send(professeur);
      } catch (error) {
        console.error('Error enrolling Professeur:', error);
        res.status(500).send('Error enrolling Professeur');
      }
    });

    app.post('/authentication_Professeurs', async (req, res) => {
      const { email, Mot_De_Passe } = req.body;
      try {
        const authentication_Professeur = new Authentication_Professeur({email, Mot_De_Passe });
        await authentication_Professeur.save();
        res.status(201).send(authentication_Professeur);
      } catch (error) {
        console.error('Error enrolling Etudiant:', error);
        res.status(500).send('Error enrolling Etudiant');
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


    const userSchema = new mongoose.Schema({
      email: String,
      password: String,
    });
    
    const User = mongoose.model('User', userSchema);
    

    app.post('/authentication_Etudiants', async (req, res) => {
      const { email, password } = req.body;
      try {
        const user = await User.findOne({ email, password });
        if (user) {
          res.json({ success: true, message: 'Login successful' });
        } else {
          res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    });
    
 
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });