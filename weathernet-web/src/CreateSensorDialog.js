import React, { Component } from 'react';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog
} from 'material-ui/Dialog';

class CreateSensorDialog extends Component {
  onFieldUpdateField = (event, field) => {
    const { value } = event.target;
    this.props.onFieldUpdate(field, value);
  };

  render() {
    const { fullScreen, open, onSave, onClose, sensor } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Register Sensor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Register a new sensor and start collecting data.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            value={sensor.name}
            onChange={evt => this.onFieldUpdateField(evt, 'name')}
            fullWidth
          />
          <TextField
            margin="dense"
            id="latitude"
            label="Latitude"
            type="number"
            value={sensor.latitude}
            onChange={evt => this.onFieldUpdateField(evt, 'latitude')}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="longitude"
            label="Longitude"
            value={sensor.longitude}
            onChange={evt => this.onFieldUpdateField(evt, 'longitude')}
            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
          <Button onClick={() => onSave()} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(CreateSensorDialog);
