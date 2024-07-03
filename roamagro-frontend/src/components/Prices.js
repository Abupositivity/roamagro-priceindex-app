// src/components/Prices.js
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';

function Prices() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/prices/current')
      .then(response => {
        setPrices(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the prices!', error);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ backgroundColor: '#388e3c' }}>
          <TableRow>
            <TableCell style={{ color: 'white' }}>Product</TableCell>
            <TableCell align="right" style={{ color: 'white' }}>Price</TableCell>
            <TableCell align="right" style={{ color: 'white' }}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prices.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.product_name}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{new Date(row.date).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Prices;
