const express = require('express');
const router = express.Router();
const getDataController = require('../controllers/getDataController');

router.get('/dataMatiere', getDataController.getDataMatiere);

module.exports = router;
