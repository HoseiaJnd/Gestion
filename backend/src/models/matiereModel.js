// models/matiereModel.js

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Connexion à la base de données PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);
// Définition du modèle Matiere
const Matiere = sequelize.define(
  'Matiere',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rubriques: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    total: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    unite: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    nature: {
      type: DataTypes.STRING(1),
      allowNull: false,
      validate: {
        isIn: [['v', 'f']], // Validation pour nature
      },
    },
    adm_dist: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    v_adm_dist: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    usine: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    v_usine: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    prod: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    v_prod: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
  },
  {
    tableName: 'matiere',
    timestamps: false,
  }
);

// Fonction pour récupérer tous les enregistrements de matiere
async function getAllMatiere() {
  return await Matiere.findAll();
}

// Fonction pour récupérer un enregistrement de matiere par nature
async function getMatiere(nature) {
  return await Matiere.findOne({ where: { nature } });
}

// Fonction pour récupérer les totaux de la vue total_v_matiere
async function getTotalVMatiere() {
  const query = 'SELECT * FROM total_v_matiere';
  const [results] = await sequelize.query(query);
  return results[0]; // Retourne le premier résultat
}

// Fonction pour insérer un nouvel enregistrement de matiere
async function insertMatiere(data) {
  return await Matiere.create(data);
}

// Vérifie la connexion à la base de données
sequelize
  .authenticate()
  .then(() => {
    console.log('Connexion réussie à la base de données.');
  })
  .catch((err) => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

module.exports = {
  getAllMatiere,
  getMatiere,
  getTotalVMatiere,
  insertMatiere,
};
