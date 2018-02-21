const express = require('express');

const router = express.Router();
const sensorModel = require('../models/sensor');

/* GET sensor listing. */
router.get('/', function(req, res, next) {
  sensorModel
    .all()
    .then(sensors => {
      res.status(200).json(sensors);
    })
    .catch(next);
});

/* GET sensor by id. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  sensorModel
    .get(id)
    .then(sensor => {
      res.status(200).json(sensor);
    })
    .catch(next);
});

/* POST create sensor. */
router.post('/', function(req, res, next) {
  const sensor = req.body;
  sensorModel
    .save(sensor)
    .then(doc => {
      res.status(201).json(doc);
    })
    .catch(next);
});

/* DELETE delete sensor. */
router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  sensorModel
    .remove(id)
    .then(doc => {
      res.status(200).json({ message: 'Deleted' });
    })
    .catch(next);
});

module.exports = router;
