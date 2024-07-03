import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          RoamAgro
        </Typography>
        <Button color="inherit" component={Link} to="/">Products</Button>
        <Button color="inherit" component={Link} to="/prices">Prices</Button>
        <Button color="inherit" component={Link} to="/add-price">Add Price</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
