import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Box, Card, Typography } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import AOS from "aos";
import "aos/dist/aos.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler // Enable gradient fill
);

const CryptoCard = () => {
    const [cryptos, setCryptos] = useState([]);

    useEffect(() => {
        fetchCryptoData();
    }, []);

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    const fetchCryptoData = async () => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 5,
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
        <Box display="flex" justifyContent="space-between" className="CardSec">
            {cryptos.map((crypto) => (
                <Card
                    key={crypto.id}
                    sx={{ width: '18%', backgroundColor: '#000', color: 'white', padding: '10px' }}
                    className="cryptCard"
                    data-aos="flip-left"
                    data-aos-duration="2000"
                >
                    <Box display="flex" alignItems="center" mb={1}>
                        <img src={crypto.image} alt={crypto.symbol} width="24px" height="24px" />
                    </Box>
                    <Box className="d-flex justify-content-between items-align-center">
                        <Typography variant="h6" sx={{ marginLeft: '10px' }}>
                            {crypto.symbol.toUpperCase()}
                        </Typography>
                        <Typography className="text-our-yellow" variant="h5">
                            <b>${crypto.current_price.toFixed(2)}</b>
                        </Typography>
                    </Box>

                    <Line
                        data={{
                            labels: Array.from({ length: crypto.sparkline_in_7d.price.length }, (_, i) => i),
                            datasets: [
                                {
                                    data: crypto.sparkline_in_7d.price,
                                    borderColor: 'rgba(206, 166, 45, 1)',
                                    backgroundColor: (context) => {
                                        const ctx = context.chart.ctx;
                                        const gradient = ctx.createLinearGradient(0, 0, 0, 180);
                                        gradient.addColorStop(0, 'rgba(206, 166, 45, 0.4)');
                                        gradient.addColorStop(1, 'rgba(206, 166, 45, 0)');
                                        return gradient;
                                    },
                                    borderWidth: 2,
                                    fill: true, // Enable gradient fill
                                    pointRadius: 0, // Remove points from the graph
                                    pointHoverRadius: 4, // Display points on hover
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
                                    tension: 0.4, // Increase tension for smoother curves
                                },
                            },
                            plugins: {
                                tooltip: {
                                    enabled: true,
                                    mode: 'nearest',
                                    callbacks: {
                                        label: function (tooltipItem) {
                                            return `$${tooltipItem.raw.toFixed(2)}`;
                                        },
                                    },
                                },
                                legend: {
                                    display: false,
                                },
                            },
                        }}
                        height={100}
                    />
                    <Typography
                        variant="subtitle1"
                        sx={{ color: crypto.price_change_percentage_24h >= 0 ? '#26E3B6' : '#F6465D' }}
                    >
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                    </Typography>
                </Card>
            ))}
        </Box>
    );
};

export default CryptoCard;
