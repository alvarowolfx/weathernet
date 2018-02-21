import React, { Component } from 'react';
import withSizes from 'react-sizes';

import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import AddIcon from 'material-ui-icons/Add';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import Header from './components/Header';
import ResizeContainer from './components/ResizeContainer';
import SensorsMap from './SensorsMap';
import SensorsList from './SensorsList';
import CreateSensorDialog from './CreateSensorDialog';

import API from './shared/API';

import { stringify } from 'querystring';
import moment from 'moment';

const sensorInitialState = {
  name: '',
  latitude: 0,
  longitude: 0
};

class App extends Component {
  state = {
    sensors: [],
    selectedSensorIndex: null,
    open: false,
    createSensorDialogOpen: false,
    sensor: { ...sensorInitialState }
  };

  componentDidMount() {
    this.loadSensors();
  }

  /**
   * Load sensor data
   */
  async loadSensors() {
    const sensors = await API.getAll('sensors');
    let { selectedSensorIndex } = this.state;
    if (selectedSensorIndex == null) {
      selectedSensorIndex = 0;
    }
    this.setState({
      sensors,
      selectedSensorIndex
    });
  }

  onSensorSelected = selectedSensorIndex => {
    this.setState({ selectedSensorIndex });
  };

  onSaveSensor = async () => {
    const { sensor } = this.state;
    try {
      const res = await API.save('sensors', sensor);
      this.setState(
        {
          sensor: { ...sensorInitialState },
          createSensorDialogOpen: false
        },
        this.loadSensors
      );
    } catch (err) {
      alert(err.message);
    }
  };

  onSensorDelete = async sensor => {
    const ok = window.confirm('Are you sure ?');
    if (ok) {
      try {
        const res = await API.deleteOne('sensors', sensor._id);
        this.loadSensors();
        alert('Sensor deleted');
      } catch (err) {
        alert(err.message);
      }
    }
  };

  onFieldUpdate = (field, value) => {
    this.setState({
      sensor: {
        ...this.state.sensor,
        [field]: value
      }
    });
  };

  onDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  onDialogToggle = () => {
    this.setState({
      createSensorDialogOpen: !this.state.createSensorDialogOpen
    });
  };

  render() {
    const {
      sensors,
      selectedSensorIndex,
      open,
      createSensorDialogOpen,
      sensor
    } = this.state;
    const { isMobile, classes } = this.props;
    const selectedDevice = selectedSensorIndex && sensors[selectedSensorIndex];
    return (
      <div>
        <Header onMenuClick={this.onDrawerToggle} />
        <Grid container direction="row">
          <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={open}
            onClose={this.onDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: isMobile // Better open performance on mobile.
            }}
          >
            {isMobile && <div style={{ marginTop: 64 }} />}
            <SensorsList
              sensors={sensors}
              onSensorSelected={this.onSensorSelected}
              onSensorDelete={this.onSensorDelete}
            />
          </Drawer>

          <ResizeContainer>
            <SensorsMap
              sensors={sensors}
              selectedSensorIndex={selectedSensorIndex}
            />
          </ResizeContainer>

          <CreateSensorDialog
            onClose={this.onDialogToggle}
            onSave={this.onSaveSensor}
            open={createSensorDialogOpen}
            sensor={sensor}
            onFieldUpdate={this.onFieldUpdate}
            fullscreen
          />

          <Button
            variant="fab"
            color="primary"
            aria-label="add"
            onClick={this.onDialogToggle}
            style={{ position: 'absolute', zIndex: 999, bottom: 44, right: 44 }}
          >
            <AddIcon />
          </Button>
        </Grid>
      </div>
    );
  }
}

const drawerWidth = 240;
const styles = theme => ({
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%'
    }
  }
});

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 960
});

const SizeApp = withSizes(mapSizesToProps)(App);
export default withStyles(styles, { withTheme: true })(SizeApp);
