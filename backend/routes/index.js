const express = require('express');
const mturkRoutes = require('./mturkRoutes');
const surveyRoutes = require('./surveyRoutes');

const router = express.Router();

router.use('/mturk', mturkRoutes);
router.use('/survey', surveyRoutes);

module.exports = router;
