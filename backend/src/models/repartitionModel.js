// models/repartitionModel.js

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
// Définition du modèle Repartition
const Repartition = sequelize.define(
  'Repartition',
  {
    nom: {
      type: DataTypes.STRING(100),
      primaryKey: true, // La colonne 'nom' est utilisée comme clé primaire
    },
    total_initial: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    cles: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    v_cles: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    total_final: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
  },
  {
    tableName: 'repartition',
    timestamps: false,
  }
);

// Fonction pour insérer un nouvel enregistrement de répartition
async function insertRepartition(data) {
  return await Repartition.create(data);
}

// Fonction pour mettre à jour un enregistrement de répartition par nom
async function updateRepartition(nom, data) {
  return await Repartition.update(data, { where: { nom } });
}

// Fonction pour récupérer un enregistrement de répartition par nom
async function getRepartition(nom) {
  return await Repartition.findOne({ where: { nom } });
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
  insertRepartition,
  updateRepartition,
  getRepartition,
};
