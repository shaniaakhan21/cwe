import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';

const CryptoTable = () => {
    const [cryptos, setCryptos] = useState([]);

    useEffect(() => {
        fetchCryptoData();
    }, []);

    const fetchCryptoData = async () => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 10,
                    page: 1,
                    sparkline: true,
                },
            });
            setCryptos(response.data);
        } catch (error) {
            console.error('Error fetching cryptocurrency data:', error);
        }
    };

    return (
        <TableContainer component={Paper} sx={{ backgroundColor: '#000', color: 'white' }} className='CryptoTable mt-4'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>24H Change</TableCell>
                        <TableCell>24H Volume</TableCell>
                        <TableCell>Market Cap</TableCell>
                        <TableCell>7D Chart</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cryptos.map((crypto, index) => (
                        <TableRow key={crypto.id}>
                            <TableCell><StarPurple500Icon sx={{ color: '#cea62d', marginRight: '5px' }} />{index + 1}</TableCell>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    <img src={crypto.image} alt={crypto.name} width="24px" height="24px" />
                                    <Typography variant="body1" sx={{ marginLeft: '10px', color: 'white' }}>
                                        {crypto.name}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell sx={{ color: '#26E3B6' }}>${crypto.current_price.toFixed(2)}</TableCell>
                            <TableCell
                                sx={{ color: crypto.price_change_percentage_24h >= 0 ? '#26E3B6!important' : '#F6465D!important' }}
                            >
                                 <b>{crypto.price_change_percentage_24h < 0 ? '-' : '+'}
                                 {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%</b>
                            </TableCell>
                            <TableCell>${crypto.total_volume.toLocaleString()}</TableCell>
                            <TableCell>${crypto.market_cap.toLocaleString()}</TableCell>
                            <TableCell className='w-25'>
                                <Line
                                    data={{
                                        labels: Array.from({ length: crypto.sparkline_in_7d.price.length }, (_, i) => i),
                                        datasets: [
                                            {
                                                data: crypto.sparkline_in_7d.price,
                                                borderColor: '#26E3B6',
                                                borderWidth: 1,
                                                fill: false,
                                            },
                                        ],
                                    }}
                                    options={{
                                        scales: {
                                            x: { display: false },
                                            y: { display: false },
                                        },
                                        elements: {
                                            line: {
                                                tension: 0.2,
                                            },
                                        },
                                        plugins: {
                                            legend: {
                                                display: false,
                                            },
                                        },
                                    }}
                                    height={40}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CryptoTable;
