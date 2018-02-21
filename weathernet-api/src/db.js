const Datastore = require('nedb')
const db = {};

db.sensors = new Datastore({ filename:'./database/sensors.db', autoload: true});
//db.sensor_history = new Datastore({ filename:'./database/sensors_history.db', autoload: true});

module.exports = db;