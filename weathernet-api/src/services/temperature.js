const DarkSky = require('dark-sky');
const darksky = new DarkSky('4a54b68d18b4c05c9034eeb3d22972ff'); // Just hardcoded for now, should get from environment

// Get current temperature
async function getCurrentTemperatureFromLocation(latitude, longitude) {
  const time = new Date();
  return getTemperatureFromLocationAndTime(time, latitude, longitude);
}

// Get temperature in a given time
async function getTemperatureFromLocationAndTime(time, latitude, longitude) {
  try {
    const forecast = await darksky.options({ latitude, longitude, time }).get();
    return forecast.currently.temperature;
  } catch (err) {
    return null;
  }
}

module.exports = {
  getCurrentTemperatureFromLocation,
  getTemperatureFromLocationAndTime
};
