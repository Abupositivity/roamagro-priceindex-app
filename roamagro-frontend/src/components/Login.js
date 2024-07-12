// src/components/Login.js

import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@mui/material';
import { login as loginApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    loginApi(username, password)
        .then(response => {
            localStorage.setItem('user', JSON.stringify(response.user));
            login();
            navigate('/');
        })
        .catch(error => {
            console.error('Invalid username or password', error);
        });
};

  return (
    <div>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError('')}
        message={error}
      />
    </div>
  );
}

export default Login;
