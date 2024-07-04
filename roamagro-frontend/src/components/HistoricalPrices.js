import React, { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Snackbar } from '@mui/material';
import { getHistoricalPrices } from '../services/api';

function HistoricalPrices() {
  const [productName, setProductName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const validateForm = () => {
    const validationErrors = {};
    if (!productName) validationErrors.productName = 'Product name is required';
    if (!startDate) validationErrors.startDate = 'Start date is required';
    if (!endDate) validationErrors.endDate = 'End date is required';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const fetchHistoricalPrices = () => {
    if (!validateForm()) return;

    setLoading(true);
    getHistoricalPrices(productName, startDate, endDate)
      .then(response => {
        setPrices(response);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the historical prices!', error);
        setMessage('Failed to fetch historical prices. Product Name incorrect/ unavailable.');
        setOpen(true);
        setLoading(false);
      });
  };

  return (
    <div>
      <TextField
        label="Agro Produce Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        error={!!errors.productName}
        helperText={errors.productName}
      />
      <TextField
        label="Start Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        error={!!errors.startDate}
        helperText={errors.startDate}
      />
      <TextField
        label="End Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        error={!!errors.endDate}
        helperText={errors.endDate}
      />
      <Button variant="contained" color="primary" onClick={fetchHistoricalPrices}>
        Fetch Historical Prices
      </Button>
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead style={{ backgroundColor: '#388e3c' }}>
              <TableRow>
                <TableCell style={{ color: 'white' }}>Agro produce</TableCell>
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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={message}
      />
    </div>
  );
}

export default HistoricalPrices;
