const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');  
const path = require('path');    




// Create an Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Remplacez par votre utilisateur MySQL
  password: '', // Remplacez par votre mot de passe MySQL
  database: 'gestion_etudiant', // Remplacez par votre nom de base de données
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err); // Log error
    return;
  }
  console.log('Connected to MySQL');
});

// Route d'enregistrement de l'administrateur
app.post('/admin/register', (req, res) => {
  const { name, email, password, mobile_number } = req.body;

  console.log('Données reçues:', req.body); // Affiche les données envoyées depuis le frontend

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Veuillez remplir tous les champs.' });
  }

  // Vérification de l'email existant dans la base de données
  db.query('SELECT * FROM admin WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification de l\'email:', err.message); // Affiche l'erreur SQL
      return res.status(500).json({ error: 'Erreur serveur lors de la vérification de l\'email.', details: err.message });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    // Hachage du mot de passe
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Erreur lors du hachage du mot de passe:', err.message); // Log error
        return res.status(500).json({ error: 'Erreur lors du hachage du mot de passe.', details: err.message });
      }

      // Insertion dans la base de données
      const query = 'INSERT INTO admin (name, email, password, mobile_number) VALUES (?, ?, ?, ?)';
      db.query(query, [name, email, hashedPassword, mobile_number || null], (err, result) => {
        if (err) {
          console.error('Erreur lors de l\'enregistrement dans la base de données:', err.message); // Log error
          return res.status(500).json({ error: 'Erreur lors de l\'enregistrement.', details: err.message });
        }

        res.status(201).json({ message: 'Administrateur enregistré avec succès.' });
      });
    });
  });
});

// Route de connexion pour l'administrateur
app.post('/admin/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Veuillez remplir tous les champs.' });
  }

  db.query('SELECT * FROM admin WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur serveur.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    }

    const admin = results[0];

    bcrypt.compare(password, admin.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
      }

      const token = jwt.sign(
        { id: admin.id, email: admin.email, name: admin.name },
        'votre_clé_secrète', // Remplacez par une clé secrète solide
        { expiresIn: '1h' }
      );

      res.json({
        message: 'Connexion réussie',
        token,
      });
    });
  });
});

// Routes pour récupérer les classes
app.get('/classes', (req, res) => {
  const query = 'SELECT * FROM classes';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Erreur lors de la récupération des classes:', err);
          return res.status(500).json({ error: 'Erreur serveur' });
      }
      res.json(results);
  });
});

// Routes pour récupérer tous les utilisateurs
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Erreur lors de la récupération des utilisateurs:', err);
          return res.status(500).json({ error: 'Erreur serveur' });
      }
      res.json(results);
  });
});

// Route pour ajouter un utilisateur
app.post('/users', (req, res) => {
  const { firstname, lastname, email, password, class: userClass } = req.body;
  const query = 'INSERT INTO users (firstname, lastname, email, password, class) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [firstname, lastname, email, password, userClass], (err, results) => {
      if (err) {
          console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
          return res.status(500).json({ error: 'Erreur serveur' });
      }
      res.status(201).json({ message: 'Utilisateur ajouté avec succès', userId: results.insertId });
  });
});

// Route pour supprimer un utilisateur
app.delete('/users', (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
      if (err) {
          console.error('Erreur lors de la suppression de l\'utilisateur:', err);
          return res.status(500).json({ error: 'Erreur serveur' });
      }
      res.json({ message: 'Utilisateur supprimé avec succès' });
  });
});

// Route pour mettre à jour un utilisateur
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { firstname, lastname, email, password, class: userClass } = req.body;
  const query = 'UPDATE users SET firstname = ?, lastname = ?, email = ?, password = ?, class = ? WHERE id = ?';
  db.query(query, [firstname, lastname, email, password, userClass, userId], (err, results) => {
      if (err) {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
          return res.status(500).json({ error: 'Erreur serveur' });
      }
      res.json({ message: 'Utilisateur mis à jour avec succès' });
  });
});

// File upload setup using Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Save with a timestamp as filename
  },
});

const upload = multer({ storage });

// Endpoint to fetch classes (this can be modified based on your classes table)
app.get('/classes', (req, res) => {
  db.query('SELECT * FROM classes', (err, results) => {
      if (err) {
          console.error('Error fetching classes:', err);
          return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
  });
});

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  const { classe_id } = req.body;
  const { path: pdfPath } = req.file;

  // Save the file information into the database
  const query = 'INSERT INTO cours (matiere, classe, pdf_path) VALUES (?, ?, ?)';
  db.query(query, [req.body.matiere, classe_id, pdfPath], (err, result) => {
      if (err) {
          console.error('Error saving file info to database:', err);
          return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'File uploaded successfully' });
  });
});

// Static file serving (to serve uploaded files)
app.use('/uploads', express.static('uploads'));


// API pour ajouter une note
app.post('/api/notes', (req, res) => {
  const { userId, note, subject } = req.body;

  if (!userId || !note || !subject) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  const query = 'INSERT INTO note (userId, note, subject) VALUES (?, ?, ?)';
  db.query(query, [userId, note, subject], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout de la note:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.status(200).json({ message: 'Note ajoutée avec succès' });
  });
});

// API pour récupérer les notes d'un étudiant (par userId)
app.get('/api/notes/:userId', (req, res) => {
  const { userId } = req.params;

  const query = 'SELECT * FROM note WHERE userId = ? ORDER BY created_at DESC';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des notes:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
});


// Démarrer le serveur sur le port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
