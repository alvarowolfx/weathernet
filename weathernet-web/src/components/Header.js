import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Hidden from 'material-ui/Hidden';

const Header = ({ onMenuClick }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Hidden mdUp>
          <IconButton color="inherit" aria-label="Menu" onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography type="title" color="inherit">
          Weathernet - Leverege
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
