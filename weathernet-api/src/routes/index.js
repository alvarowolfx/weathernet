const express = require('express');
const router = express.Router();

const sensors = require('./sensors');

router.use('/sensors', sensors);

module.exports = router;
