const sensorDb = require('../models/sensor');
const temperatureService = require('../services/temperature');

// Update all sensors temperature
async function run(time) {
  const sensors = await sensorDb.all();
  sensors.forEach(async sensor => {
    const { _id } = sensor;
    console.log(`Updating temperature for sensor ${sensor.name}.`);
    const temperature = await temperatureService.getTemperatureFromLocationAndTime(
      time,
      sensor.latitude,
      sensor.longitude
    );
    if (temperature) {
      await sensorDb.save({ _id, temperature });
      console.log(`Sensor ${sensor.name} updated.`);
    } else {
      console.log(`No temperature data found for ${sensor.name}.`);
    }
  });
}

module.exports = {
  run
};
