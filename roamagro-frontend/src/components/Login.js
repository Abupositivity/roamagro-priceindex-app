// src/components/Login.js

import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated, setMessage, setOpen }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        login(username, password)
            .then(response => {
                localStorage.setItem('user', JSON.stringify(response.user));
                setIsAuthenticated(true);
                setMessage('Logged in successfully');
                setOpen(true);
                navigate('/');
            })
            .catch(error => {
                setMessage('Invalid username or password');
                setOpen(true);
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
                Admin Login
            </Button>
        </div>
    );
}

export default Login;
