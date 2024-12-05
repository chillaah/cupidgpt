const express = require('express');
const mturkController = require('../controllers/mturkController');

const router = express.Router();
router.post('/fetch-results', mturkController.fetchResults);

module.exports = router;
