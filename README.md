# Weathernet - Coding Challenge for Leverege

## Challenge

Create a server that simulates temperature sensors located at our Germantown office based off the temperature. To find the temperature/weather, you can use the Dark Sky Net API (You can make up to 1000 requests per day for free). For every 5 seconds that pass in real world time, the simulation should increment one hour.

A temperature sensor has these attributes:

* Id
* Name
* Temperature (+/- 10°Fahrenheit)

Create a frontend UI to visualize the sensor values using React UI to visualize the temperature. On the dashboard, we should be able to add and delete temperature sensors.

### API Project

* Created using ExpressJS cli
* NodeJS v7.7.1
* NeDB as Datastore
* DarkSky API

To run this project, install dependencies running `npm install`, then start the server with the command `npm start`.

### WebApp Project

* Created using `create-react-app`
* ReactJS
* Material-UI
* Leaflet + Google Maps Layer

To run this project, install dependencies running `npm install`, then start the server with the command `npm start`.
