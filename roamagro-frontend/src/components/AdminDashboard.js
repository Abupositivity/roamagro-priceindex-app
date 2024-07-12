// src/components/AdminDashboard.js

import React from 'react';
import { Container, Typography, Grid, Paper, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleAddPrice = () => {
    navigate('/add');
  };

  const handleUpdatePrice = () => {
    navigate('/update');
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ padding: 16 }}>
              <Typography variant="h6">
                Add Price
              </Typography>
              <Typography variant="body1" gutterBottom>
                Add new prices to the database.
              </Typography>
              <Button variant="contained" color="primary" onClick={handleAddPrice}>
                Add Price
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ padding: 16 }}>
              <Typography variant="h6">
                Update Price
              </Typography>
              <Typography variant="body1" gutterBottom>
                Update existing prices in the database.
              </Typography>
              <Button variant="contained" color="secondary" onClick={handleUpdatePrice}>
                Update Price
              </Button>
            </Paper>
          </Grid>
          {/* Add more administrative functionalities as needed */}
        </Grid>
      </Box>
    </Container>
  );
}

export default AdminDashboard;
