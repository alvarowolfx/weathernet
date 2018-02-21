import React from 'react';

import { LatLng, LatLngBounds } from 'leaflet';
import { Map, Popup } from 'react-leaflet';
import { GoogleLayer } from 'react-leaflet-google';
import DivIcon from 'react-leaflet-div-icon';
import MyLocationIcon from 'material-ui-icons/MyLocation';

import { randomColorFromString } from './shared/Colors';

const SensorCurrentPoint = ({ sensor }) => {
  const color = randomColorFromString(sensor._id);
  return (
    <DivIcon position={[sensor.latitude, sensor.longitude]}>
      <span>
        <MyLocationIcon fill={color} style={{ ...styles.pin, color }} />
        <Popup>
          <span>
            Sensor {sensor.name}
            <br />
            Temperature: {sensor.temperature}
            <br />
          </span>
        </Popup>
      </span>
    </DivIcon>
  );
};

const SensorsMap = ({ sensors, selectedSensorIndex }) => {
  const position = [51.505, -0.09];
  let bounds = null;
  if (sensors.length > 0) {
    const points = sensors.map(
      sensor => new LatLng(sensor.latitude, sensor.longitude)
    );
    bounds = new LatLngBounds(points);
  } else {
    const southWest = new LatLng(40.712, -74.227);
    const northEast = new LatLng(40.774, -74.125);
    bounds = new LatLngBounds(southWest, northEast);
  }
  return (
    <Map
      bounds={bounds}
      boundsOptions={{ padding: [50, 50] }}
      center={position}
      zoom={13}
    >
      <GoogleLayer maptype="ROADMAP" googlekey="" />
      {sensors.map(sensor => (
        <SensorCurrentPoint key={sensor._id} sensor={sensor} />
      ))}
    </Map>
  );
};

const styles = {
  pin: {
    width: 44,
    height: 44,
    position: 'relative',
    left: '-16px'
  }
};

export default SensorsMap;
