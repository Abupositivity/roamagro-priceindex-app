// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Grid, Box, MenuItem, Menu, IconButton, Snackbar } from '@mui/material';
import Prices from './components/Prices';
import HistoricalPrices from './components/HistoricalPrices';
import AddPrice from './components/AddPrice';
import UpdatePrice from './components/UpdatePrice';
import Logo from './logo.png';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './components/AdminDashboard';


function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { isAuthenticated, logout } = useAuth();
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setMessage('Logged out successfully');
    setOpen(true);
  };

  return (
    <AuthProvider>
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
                <MenuItem component={Link} to="/login">Admin Login</MenuItem>
              )}
            </Menu>
          </Toolbar>
        </AppBar>
        <Container>
          <Grid container spacing={2} justifyContent="center" style={{ marginTop: 20 }}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center" gutterBottom>
                Local Market Prices of Major Agro Produce in Northern Nigeria.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
            </Grid>
          </Grid>
          <Routes>
            <Route path="/" element={<Prices />} />
            <Route path="/historical" element={<HistoricalPrices />} />
            <Route path="/add" element={<AdminRoute><AddPrice /></AdminRoute>} />
            <Route path="/update" element={<AdminRoute><UpdatePrice /></AdminRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
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
    </AuthProvider>
  );
}

export default App;
