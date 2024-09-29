const express = require('express');
const router = express.Router();
const getDataController = require('../controllers/getDataController');

router.get('/dataMatiere', getDataController.getDataMatiere);
router.get('/dataRepartition', getDataController.getDataRepartition);
router.get('/dataCoutDirect', getDataController.getDataCoutDirect);
router.get('/dataCoutFini', getDataController.getDataCoutFini);

module.exports = router;
