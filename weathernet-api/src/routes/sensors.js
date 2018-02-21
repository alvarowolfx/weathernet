const express = require('express');
const Joi = require('joi');

const router = express.Router();
const sensorModel = require('../models/sensor');

const sensorSchema = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  latitude: Joi.number()
    .less(90)
    .greater(-90)
    .required(),
  longitude: Joi.number()
    .less(90)
    .greater(-90)
    .required()
});

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
  const result = Joi.validate(sensor, sensorSchema);
  const err = result.error;
  if (err) {
    next(err);
    return;
  }
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
      res.status(204).json({});
    })
    .catch(next);
});

module.exports = router;
