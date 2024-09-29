// models/coutModel.js

const { Sequelize, DataTypes } = require('sequelize');

// Connexion à la base de données PostgreSQL
const sequelize = new Sequelize('compta', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

// Définition du modèle CoutDirect
const CoutDirect = sequelize.define(
  'CoutDirect',
  {
    unite_produit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre_produit: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    cout_prod: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    cout_unitaire_direct: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
  },
  {
    tableName: 'cout_direct',
    timestamps: false,
  }
);

// Définition du modèle CoutFini
const CoutFini = sequelize.define(
  'CoutFini',
  {
    unite_produit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombre_produit: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    cout_prod: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    cout_usine: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    cout_total: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    cout_unitaire_final: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
  },
  {
    tableName: 'cout_fini',
    timestamps: false,
  }
);

// Fonctions pour interagir avec la base de données
async function insertCoutDirect(data) {
  return await CoutDirect.create(data);
}

async function updateCoutDirect(data, id) {
  return await CoutDirect.update(data, { where: { id } });
}

async function getCoutDirect() {
  return await CoutDirect.findOne();
}

async function insertCoutFini(data) {
  return await CoutFini.create(data);
}

async function updateCoutFini(data, id) {
  return await CoutFini.update(data, { where: { id } });
}

async function getCoutFini() {
  return await CoutFini.findOne();
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
  insertCoutDirect,
  updateCoutDirect,
  getCoutDirect,
  insertCoutFini,
  updateCoutFini,
  getCoutFini,
};
