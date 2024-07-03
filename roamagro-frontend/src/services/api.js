import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getCurrentPrices = async () => {
    const response = await axios.get(`${API_URL}/prices/current`);
    return response.data;
};

export const getHistoricalPrices = async (productId, startDate, endDate) => {
    const response = await axios.get(`${API_URL}/prices/historical`, {
        params: { product_id: productId, start_date: startDate, end_date: endDate }
    });
    return response.data;
};

export const addPrice = async (priceData) => {
    const response = await axios.post(`${API_URL}/prices`, priceData);
    return response.data;
};

export const updatePrice = async (id, priceData) => {
    const response = await axios.put(`${API_URL}/prices/${id}`, priceData);
    return response.data;
};
