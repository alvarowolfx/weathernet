const db = require('../db');

const temperatureService = require('../services/temperature');

const sensorsDb = db.sensors;

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
  return new Promise(async (resolve, reject) => {
    const temperature = await temperatureService.getCurrentTemperatureFromLocation(
      sensor.latitude,
      sensor.longitude
    );

    sensor.temperature = temperature;

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
  const { _id } = sensor;
  delete sensor._id;
  return new Promise((resolve, reject) => {
    sensorsDb.update({ _id }, { $set: sensor }, {}, err => {
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
