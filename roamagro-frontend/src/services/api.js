// src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        return response.data;
    } catch (error) {
        throw new Error('Login failed');
    }
};

export const logout = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`);
        return response.data;
    } catch (error) {
        throw new Error('Logout failed');
    }
};

export const getCurrentPrices = async () => {
    const response = await axios.get(`${API_URL}/prices/current`);
    return response.data;
};

export const getHistoricalPrices = async (productName, startDate, endDate) => {
    const response = await axios.get(`${API_URL}/prices/historical`, {
        params: { product_name: productName, start_date: startDate, end_date: endDate }
    });
    return response.data;
};

export const addPrice = async (priceData) => {
    const response = await axios.post(`${API_URL}/prices`, priceData);
    return response.data;
};

export const updatePrice = async (productName, priceData) => {
    const response = await axios.put(`${API_URL}/prices/${productName}`, priceData);
    return response.data;
};
