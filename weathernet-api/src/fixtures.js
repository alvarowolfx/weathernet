const sensorDb = require('./models/sensor');

function createFixtures() {
  // Initialize with some data
  sensorDb.all().then(sensors => {
    if (sensors.length === 0) {
      console.log('Empty database ... Inserting initial data.');
      sensorDb
        .save({
          name: 'Leverege sensor',
          latitude: 39.1868656,
          longitude: -77.2526086
        })
        .then(sensor => {
          console.log('Initial sensor created :', JSON.stringify(sensor));
        })
        .catch(err => {
          console.error(err);
        });
    }
  });
}

module.exports = {
  createFixtures
};
