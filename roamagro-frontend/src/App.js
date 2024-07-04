// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Grid, TextField, Box, MenuItem, Menu, IconButton, Snackbar } from '@mui/material';
import Prices from './components/Prices';
import HistoricalPrices from './components/HistoricalPrices';
import AddPrice from './components/AddPrice';
import UpdatePrice from './components/UpdatePrice';
import Login from './components/Login';
import Logo from './logo.png';

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setMessage('Logged out successfully');
    setOpen(true);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <img src={Logo} alt="RoamAgro Logo" style={{ width: 40, marginRight: 10 }} />
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            RoamAgro
          </Typography>
          <IconButton
            aria-label="more options"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <i className="material-icons">more</i>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/">Home</MenuItem>
            <MenuItem component={Link} to="/historical">Historical Prices</MenuItem>
            {isAuthenticated ? (
              <>
                <MenuItem component={Link} to="/add">Add Price</MenuItem>
                <MenuItem component={Link} to="/update">Update Price</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            ) : (
              <MenuItem component={Link} to="/login">Login</MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={2} justifyContent="center" style={{ marginTop: 20 }}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              Get current prices of major agro produce in Northern Nigeria.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <TextField
                variant="outlined"
                label="Local Market"
                fullWidth
                InputProps={{ style: { paddingRight: 0 } }}
              />
              <Button variant="contained" color="primary" style={{ marginLeft: 10 }}>
                Search
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Routes>
          <Route path="/" element={<Prices />} />
          <Route path="/historical" element={<HistoricalPrices />} />
          <Route path="/add" element={isAuthenticated ? <AddPrice /> : <Login setIsAuthenticated={setIsAuthenticated} setMessage={setMessage} setOpen={setOpen} />} />
          <Route path="/update" element={isAuthenticated ? <UpdatePrice /> : <Login setIsAuthenticated={setIsAuthenticated} setMessage={setMessage} setOpen={setOpen} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setMessage={setMessage} setOpen={setOpen} />} />
        </Routes>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message={message}
        />
        <Box mt={5} p={2} bgcolor="#4CAF50" color="white" textAlign="center">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} RoamAgro. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
