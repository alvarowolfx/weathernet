import React, { Component } from 'react';

import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import MyLocationIcon from 'material-ui-icons/MyLocation';
import RemoveIcon from 'material-ui-icons/DeleteForever';
import IconButton from 'material-ui/IconButton';

class SensorsList extends Component {
  render() {
    const { sensors, onSensorSelected, onSensorDelete } = this.props;
    const isEmpty = sensors.length === 0;
    return (
      <div>
        <List component="nav">
          {isEmpty && (
            <ListItem>
              <h4>No sensors registered</h4>
            </ListItem>
          )}
          {sensors.map((sensor, index) => {
            return (
              <ListItem
                button
                key={sensor._id}
                onClick={
                  onSensorSelected
                    ? () => {
                        onSensorSelected(index);
                      }
                    : undefined
                }
              >
                <ListItemIcon>
                  <MyLocationIcon />
                </ListItemIcon>
                <ListItemText
                  primary={sensor.name}
                  secondary={`${sensor.temperature}Fº`}
                />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Comments">
                    <RemoveIcon onClick={() => onSensorDelete(sensor)} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

export default SensorsList;
