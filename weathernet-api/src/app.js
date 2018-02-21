const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes');
const errorMiddleware = require('./middlewares/error');
const sensorDb = require('./models/sensor');

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

// Initialize with some data
sensorDb.all()
  .then( sensors => {        
    if(sensors.length === 0){
      console.log('Empty database ... Inserting initial data.');
      sensorDb.save({
        name: 'Leverege sensor',
        latitude: 39.1868656,
        longitude: -77.2526086
      }).then( sensor => {
        console.log('Initial sensor created :', JSON.stringify(sensor));
      }).catch( err => {
        console.error(err);
      });
    }
  })

module.exports = app;
