// src/components/HistoricalPrices.js
import React, { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { getHistoricalPrices } from '../services/api';

function HistoricalPrices() {
  const [productName, setProductName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchHistoricalPrices = () => {
    setLoading(true);
    getHistoricalPrices(productName, startDate, endDate)
    .then(response => {
      setPrices(response);
      setLoading(false);
    })
    .catch(error => {
      console.error('There was an error fetching the historical prices!', error);
      setLoading(false);
    });
  };

  return (
    <div>
      <TextField
        label="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <TextField
        label="Start Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <TextField
        label="End Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={fetchHistoricalPrices}>
        Fetch Historical Prices
      </Button>
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
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
      )}
    </div>
  );
}

export default HistoricalPrices;
