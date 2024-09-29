// controllers/coutDirectController.js

const express = require('express');
const router = express.Router();
const { insertCoutDirect, updateCoutDirect, getCoutDirect, insertCoutFini, updateCoutFini } = require('../models/coutModel');
const { getRepartition } = require('../models/repartitionModel');

// Route pour afficher le formulaire d'insertion
router.get('/', (req, res) => {
    console.log('test pory');
    res.render('insert_coutDirect'); // Assurez-vous d'avoir la vue correspondante
});

// Route pour gérer l'insertion
router.post('/insert', async (req, res) => {
    try {
        const prod = await getRepartition('prod');
        const usine = await getRepartition('usine');
        const coutTotal = parseFloat(prod.total_final) + parseFloat(usine.total_final);
        console.log(coutTotal);
        const nb = req.body.nombre;
        const nb_fini = req.body.nombre_fini;

        const direct = {
            unite_produit: req.body.unite,
            nombre_produit: nb,
            cout_prod: parseFloat(prod.total_final),
            cout_unitaire_direct: parseFloat(prod.total_final) / nb,
        };

        const fini = {
            unite_produit: req.body.unite_usine,
            nombre_produit: nb_fini,
            cout_prod: parseFloat(prod.total_final),
            cout_usine: parseFloat(usine.total_final),
            cout_total: coutTotal,
            cout_unitaire_final: coutTotal / nb_fini,
        };

        const coutD = await getCoutDirect();
        if (!coutD) {
            await insertCoutDirect(direct);
            await insertCoutFini(fini);
        } else {
            await updateCoutDirect(direct, 1);
            await updateCoutFini(fini, 1);
        }

        res.status(200).json({ message: 'Données insérées avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors du traitement de la requête.' });
    }
});

module.exports = router;
