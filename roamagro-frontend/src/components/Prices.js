// src/components/Prices.js
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box, Button } from '@mui/material';
import { getCurrentPrices } from '../services/api';

function Prices() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pricesPerPage = 11;

  useEffect(() => {
    getCurrentPrices()
      .then(response => {
        // Sort prices by date in descending order
        const sortedPrices = response.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPrices(sortedPrices);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the prices!', error);
      });
  }, []);

  const indexOfLastPrice = currentPage * pricesPerPage;
  const indexOfFirstPrice = indexOfLastPrice - pricesPerPage;
  const currentPrices = prices.slice(indexOfFirstPrice, indexOfLastPrice);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: '#388e3c' }}>
            <TableRow>
              <TableCell style={{ color: 'white' }}>Agro produce</TableCell>
              <TableCell align="right" style={{ color: 'white' }}>Price(₦)</TableCell>
              <TableCell align="right" style={{ color: 'white' }}>Date updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPrices.map((row) => (
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
      <Box mt={2} display="flex" justifyContent="center">
        {Array.from({ length: Math.ceil(prices.length / pricesPerPage) }, (_, index) => (
          <Button
            key={index}
            onClick={() => paginate(index + 1)}
            variant="contained"
            color="primary"
            style={{ margin: '0 5px' }}
          >
            {index + 1}
          </Button>
        ))}
      </Box>
    </>
  );
}

export default Prices;
