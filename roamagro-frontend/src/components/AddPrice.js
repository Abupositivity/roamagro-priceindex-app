// src/components/AddPrice.js
import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@mui/material';
import { addPrice } from '../services/api';

function AddPrice() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const validationErrors = {};

    if (!productName) validationErrors.productName = 'Product name is required';
    if (!price || isNaN(price) || price <= 0) validationErrors.price = 'Valid price is required';
    if (!date) validationErrors.date = 'Date is required';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    addPrice({ product_name: productName, price, date })
      .then(response => {
        setOpen(true);
        setProductName('');
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
        label="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        error={!!errors.productName}
        helperText={errors.productName}
      />
      <TextField
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        error={!!errors.price}
        helperText={errors.price}
      />
      <TextField
        label="Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        error={!!errors.date}
        helperText={errors.date}
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
