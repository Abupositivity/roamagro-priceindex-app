// src/components/AddPrice.js
import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@mui/material';
import axios from 'axios';

function AddPrice() {
  const [productId, setProductId] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    axios.post('/api/prices', {
      product_id: productId,
      price: price,
      date: date,
    })
    .then(response => {
      setOpen(true);
      setProductId('');
      setPrice('');
      setDate('');
    })
    .catch(error => {
      console.error('There was an error adding the price!', error);
    });
  };

  return (
    <div>
      <TextField
        label="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <TextField
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        label="Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add Price
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="Price added successfully"
      />
    </div>
  );
}

export default AddPrice;
