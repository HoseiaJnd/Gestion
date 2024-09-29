// controllers/matiereController.js

const express = require('express');
const router = express.Router();
const { insertMatiere, getTotalVMatiere } = require('../models/matiereModel');
const { updateRepartition } = require('../models/repartitionModel');

// Route pour afficher le formulaire d'insertion
router.get('/', (req, res) => {
    res.render('insert_matiere'); // Assurez-vous d'avoir la vue correspondante
});

// Route pour traiter l'insertion de matière
router.post('/insert', async (req, res) => {
    const total = req.body.total;
    const adm_dist = req.body.adm_dist;
    const v_adm_dist = (adm_dist * total) / 100;

    const usine = req.body.usine;
    const v_usine = (usine * total) / 100;

    const prod = req.body.prod;
    const v_prod = (prod * total) / 100;

    const data = {
        rubriques: req.body.rubrique,
        total: total,
        unite: req.body.unite,
        nature: req.body.nature,
        adm_dist: adm_dist,
        v_adm_dist: v_adm_dist,
        usine: usine,
        v_usine: v_usine,
        prod: prod,
        v_prod: v_prod
    };

    try {
        await insertMatiere(data);

        const repartition = await getTotalVMatiere();

        console.log("Avant:");
        console.log("Total usine : " + parseFloat(repartition.total_usine));
        console.log("Total prod : " + parseFloat(repartition.total_prod));
        console.log("Total : " + (parseFloat(repartition.total_usine) + parseFloat(repartition.total_prod)));
        console.log("Total usine X 100 : " + (parseFloat(repartition.total_usine) * 100));
        console.log("Total usine X 100 / Total : " + ((parseFloat(repartition.total_usine) * 100) / (parseFloat(repartition.total_usine) + parseFloat(repartition.total_prod))));

        const Gtotal = parseFloat(repartition.total_usine) + parseFloat(repartition.total_prod);
        const cles_usine = (Gtotal == 0 || Gtotal === null) ? 0 : (parseFloat(repartition.total_usine) * 100) / Gtotal;
        const v_cles_usine = (cles_usine == 0 || cles_usine === null || parseFloat(repartition.total_adm_dist) == 0 || parseFloat(repartition.total_adm_dist) === null) ? 0 : (parseFloat(repartition.total_adm_dist) * cles_usine) / 100;

        console.log("Apres:");
        console.log("cles_usine : " + cles_usine);
        console.log("v_cles_usine : " + v_cles_usine);

        const data2 = {
            total_initial: parseFloat(repartition.total_usine),
            cles: cles_usine,
            v_cles: v_cles_usine,
            total_final: parseFloat(repartition.total_usine) + v_cles_usine
        };
        await updateRepartition('usine', data2);

        const cles_prod = (Gtotal == 0 || Gtotal === null) ? 0 : (parseFloat(repartition.total_prod) * 100) / Gtotal;
        const v_cles_prod = (cles_prod == 0 || cles_prod === null || parseFloat(repartition.total_adm_dist) == 0 || parseFloat(repartition.total_adm_dist) === null) ? 0 : (parseFloat(repartition.total_adm_dist) * cles_prod) / 100;
        const data3 = {
            total_initial: parseFloat(repartition.total_prod),
            cles: cles_prod,
            v_cles: v_cles_prod,
            total_final: parseFloat(repartition.total_prod) + v_cles_prod
        };
        await updateRepartition('prod', data3);

        res.redirect('/matiere'); // Redirige vers le contrôleur des matières
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'insertion de la matière.');
    }
});

module.exports = router;
