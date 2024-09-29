// app.js

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour gérer le corps des requêtes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware pour gérer les sessions
app.use(session({
    secret: 'votre_secret', // Changez ceci avec un secret fort
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Utilisez `true` en production avec HTTPS
}));

// Middleware pour servir des fichiers statiques
app.use(express.static(path.join(__dirname, 'public'))); // Servir les fichiers de 'public'

// Middleware pour la gestion des vues
app.set('view engine', 'ejs'); // Si vous utilisez EJS
app.set('views', path.join(__dirname, 'src/views')); // Répertoire des vues

// Importer les contrôleurs
const CoutDirectController = require('./src/controllers/coutDirectController');
const MatiereController = require('./src/controllers/matiereController');

// Routes
app.use('/', MatiereController);
app.use('/cout-direct', CoutDirectController);
app.use('/matiere', MatiereController);

// Middleware pour vérifier si l'utilisateur est connecté
function checkAuthenticated(req, res, next) {
    if (req.session.user_id) {
        return next(); // L'utilisateur est authentifié, continuer vers la route suivante
    }
    res.redirect('/'); // L'utilisateur n'est pas authentifié, rediriger vers la page de connexion
}

// Exemple d'utilisation du middleware sur certaines routes
// app.use('/cout-direct', checkAuthenticated); // Protège toutes les routes cout-direct
// app.use('/matiere', checkAuthenticated); // Protège toutes les routes matiere

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Quelque chose a mal tourné!');
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
