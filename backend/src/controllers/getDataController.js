const mysql = require('mysql2/promise');

// Configuration de la connexion à la base de données
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'compta'
};

exports.getDataMatiere = async (req, res) => {
  let connection;
  try {
    // Établir la connexion à la base de données
    connection = await mysql.createConnection(dbConfig);

    // Exécuter la requête SQL pour récupérer les données de la table matiere
    const [rows] = await connection.execute('SELECT * FROM matiere');

    // Envoyer les données en réponse
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des données' });
  } finally {
    if (connection) {
      // Fermer la connexion à la base de données
      await connection.end();
    }
  }
};
