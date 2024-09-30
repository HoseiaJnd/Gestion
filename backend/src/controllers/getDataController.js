const { Pool } = require('pg');

// Configuration de la connexion à la base de données
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432, // Port par défaut pour PostgreSQL
};

const pool = new Pool(dbConfig);

exports.getDataMatiere = async (req, res) => {
  let client;
  try {
    // Établir la connexion à la base de données
    client = await pool.connect();

    // Exécuter la requête SQL pour récupérer les données de la table matiere
    const result = await client.query('SELECT * FROM matiere');
    console.log('method : getMatiere');

    // Envoyer les données en réponse
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des données' });
  } finally {
    if (client) {
      // Fermer la connexion à la base de données
      client.release();
    }
  }
};

exports.getDataRepartition = async (req, res) => {
  let client;
  try {
    // Établir la connexion à la base de données
    client = await pool.connect();

    // Exécuter la requête SQL pour récupérer les données de la table repartition
    const result = await client.query('SELECT * FROM repartition');
    console.log('method : getDataRepartition');

    // Envoyer les données en réponse
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des données' });
  } finally {
    if (client) {
      // Fermer la connexion à la base de données
      client.release();
    }
  }
}; 

exports.getDataCoutDirect = async (req, res) => {
  let client;
  try {
    // Établir la connexion à la base de données
    client = await pool.connect();

    // Exécuter la requête SQL pour récupérer les données de la table coutdirect
    const result = await client.query('SELECT * FROM cout_direct');
    console.log('method : getDataCoutDirect');

    // Envoyer les données en réponse
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des données' });
  } finally {
    if (client) {
      // Fermer la connexion à la base de données
      client.release();
    }
  }
};

exports.getDataCoutFini = async (req, res) => {
  let client;
  try {
    // Établir la connexion à la base de données
    client = await pool.connect();

    // Exécuter la requête SQL pour récupérer les données de la table coutindirect
    const result = await client.query('SELECT * FROM cout_fini');
    console.log('method : getDataCoutFini');

    // Envoyer les données en réponse
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des données' });
  } finally {
    if (client) {
      // Fermer la connexion à la base de données
      client.release();
    }
  }
};

