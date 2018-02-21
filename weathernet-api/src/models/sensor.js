const db = require('../db');
const Joi = require('joi');
const sensorsDb = db.sensors;

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

function all() {
  return new Promise((resolve, reject) => {
    sensorsDb.find({}, (err, docs) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(docs);
    });
  });
}

function get(id) {
  return new Promise((resolve, reject) => {
    sensorsDb.findOne({ _id: id }, (err, doc) => {
      if (err) {
        reject(err);
        return;
      }
      if (!doc) {
        reject(new Error('Not found'));
        return;
      }
      resolve(doc);
    });
  });
}

function save(sensor) {
  if (sensor._id) {
    return _update(sensor);
  } else {
    return _insert(sensor);
  }
}

function _insert(sensor) {
  return new Promise((resolve, reject) => {
    const result = Joi.validate(sensor, sensorSchema);
    const err = result.error;
    if (err) {
      reject(err);
      return;
    }

    sensorsDb.insert([sensor], (err, newDocs) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(newDocs[0]);
    });
  });
}

function _update(sensor) {
  const id = sensor._id;
  delete sensor._id;
  return new Promise((resolve, reject) => {
    sensorsDb.update({ _id: sensor._id }, sensor, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    sensorsDb.remove({ _id: id }, (err, count) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(count);
    });
  });
}

module.exports = {
  all,
  get,
  save,
  remove
};
