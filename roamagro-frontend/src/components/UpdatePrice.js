// src/components/UpdatePrice.js
import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@mui/material';
import { updatePrice } from '../services/api';

function UpdatePrice() {
  const [id, setId] = useState('');
  const [productId, setProductId] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  
  const handleSubmit = () => {
    updatePrice(id, {
      product_id: productId,
      price: price,
      date: date,
    })
    .then(response => {
      setOpen(true);
      setId('');
      setProductId('');
      setPrice('');
      setDate('');
    })
    .catch(error => {
      console.error('There was an error updating the price!', error);
    });
  };

  return (
    <div>
      <TextField
        label="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
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
        Update Price
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="Price updated successfully"
      />
    </div>
  );
}

export default UpdatePrice;
