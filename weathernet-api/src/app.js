const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes');
const fixtures = require('./fixtures');
const errorMiddleware = require('./middlewares/error');
const Simulation = require('./services/simulation');
const updateSensorTemperatureJob = require('./jobs/updateSensorTemperature');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorMiddleware);

// Insert some initial data
fixtures.createFixtures();

// Configure simulation
const simulation = new Simulation(5000, 60 * 60 * 1000);
simulation.setAction(time => {
  console.log('Tick with time: ' + new Date(time));
  updateSensorTemperatureJob.run(time);
});
simulation.start();

module.exports = app;
