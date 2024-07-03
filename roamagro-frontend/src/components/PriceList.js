import React, { useEffect, useState } from 'react';
import { getCurrentPrices } from '../services/api';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

const PriceList = () => {
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        const fetchPrices = async () => {
            const data = await getCurrentPrices();
            setPrices(data);
        };
        fetchPrices();
    }, []);

    return (
        <Container component={Paper} style={{ marginTop: '2rem', padding: '1rem' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Product ID</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {prices.map((price) => (
                        <TableRow key={price.id}>
                            <TableCell>{price.id}</TableCell>
                            <TableCell>{price.product_id}</TableCell>
                            <TableCell>{price.price}</TableCell>
                            <TableCell>{price.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default PriceList;
