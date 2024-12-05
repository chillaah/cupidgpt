const express = require('express');
const surveyController = require('../controllers/surveyController');

const router = express.Router();
router.post('/store-results', surveyController.storeResults);

module.exports = router;
