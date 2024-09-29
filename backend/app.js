// app.js

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios"); // Ajoutez cette ligne
const cors = require("cors"); // Ajouté pour CORS
const CoutDirectController = require("./src/controllers/coutDirectController");
const routes = require("./src/routes/routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour gérer le corps des requêtes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware pour gérer les sessions
app.use(
  session({
    secret: "votre_secret", // Changez ceci avec un secret fort
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Utilisez `true` en production avec HTTPS
  })
);

// Middleware pour servir des fichiers statiques
app.use(express.static(path.join(__dirname, "public"))); // Servir les fichiers de 'public'

// Middleware pour la gestion des vues
app.set("view engine", "ejs"); // Si vous utilisez EJS
app.set("views", path.join(__dirname, "src/views")); // Répertoire des vues

// Importer les contrôleurs
const MatiereController = require("./src/controllers/matiereController");

// Middleware pour CORS
app.use(cors());

// Routes
app.use("/api/cout-direct", CoutDirectController);
app.use("/api/matiere", MatiereController);

app.use(express.json());
app.use("/api", routes);

// Middleware pour vérifier si l'utilisateur est connecté
function checkAuthenticated(req, res, next) {
  if (req.session.user_id) {
    return next(); // L'utilisateur est authentifié, continuer vers la route suivante
  }
  res.redirect("/"); // L'utilisateur n'est pas authentifié, rediriger vers la page de connexion
}

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Quelque chose a mal tourné!");
});

// Ajoutez cette ligne pour déboguer
app.use((req, res, next) => {
  console.log(`Requête reçue: ${req.method} ${req.url}`);
  next();
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
