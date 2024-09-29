// controllers/matiereController.js

const express = require('express');
const router = express.Router();
const { insertMatiere, getTotalVMatiere } = require('../models/matiereModel');
const { updateRepartition } = require('../models/repartitionModel');

// Route pour traiter l'insertion de matière
router.post('/insert', async (req, res) => {
    console.log("MatiereController")
    try {
        const { rubrique, total, unite, nature, adm_dist, usine, prod } = req.body;

        const v_adm_dist = (adm_dist * total) / 100;
        const v_usine = (usine * total) / 100;
        const v_prod = (prod * total) / 100;

        const data = {
            rubriques: rubrique,
            total: total,
            unite: unite,
            nature: nature,
            adm_dist: adm_dist,
            v_adm_dist: v_adm_dist,
            usine: usine,
            v_usine: v_usine,
            prod: prod,
            v_prod: v_prod
        };

        await insertMatiere(data);

        const repartition = await getTotalVMatiere();

        const Gtotal = parseFloat(repartition.total_usine) + parseFloat(repartition.total_prod);
        const cles_usine = (Gtotal === 0) ? 0 : (parseFloat(repartition.total_usine) * 100) / Gtotal;
        const v_cles_usine = (cles_usine === 0 || parseFloat(repartition.total_adm_dist) === 0) ? 0 : (parseFloat(repartition.total_adm_dist) * cles_usine) / 100;

        const data2 = {
            total_initial: parseFloat(repartition.total_usine),
            cles: cles_usine,
            v_cles: v_cles_usine,
            total_final: parseFloat(repartition.total_usine) + v_cles_usine
        };
        await updateRepartition('usine', data2);

        const cles_prod = (Gtotal === 0) ? 0 : (parseFloat(repartition.total_prod) * 100) / Gtotal;
        const v_cles_prod = (cles_prod === 0 || parseFloat(repartition.total_adm_dist) === 0) ? 0 : (parseFloat(repartition.total_adm_dist) * cles_prod) / 100;
        const data3 = {
            total_initial: parseFloat(repartition.total_prod),
            cles: cles_prod,
            v_cles: v_cles_prod,
            total_final: parseFloat(repartition.total_prod) + v_cles_prod
        };
        await updateRepartition('prod', data3);

        res.status(200).json({ message: 'Matière insérée avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'insertion de la matière:', error);
        res.status(500).json({ message: 'Erreur lors de l\'insertion de la matière' });
    }
});

module.exports = router;
