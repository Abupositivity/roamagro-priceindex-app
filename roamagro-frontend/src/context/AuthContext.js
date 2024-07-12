// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/user');
                setUser(response.data);
            } catch (error) {
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('/api/login', { username, password });
            setUser(response.data);
        } catch (error) {
            throw new Error('Login failed');
        }
    };

    const logout = async () => {
        await axios.post('/api/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };