import { useEffect, useState } from 'react';
import axios from 'axios';

const CryptoList = () => {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/coins/markets',
                    {
                        params: {
                            vs_currency: 'usd',
                            order: 'market_cap_desc',
                            per_page: 7,
                            page: 1,
                            sparkline: false,
                        },
                    }
                );
                setCryptos(response.data);
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchCryptos();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='cryptos py-3 px-5 mb-5 mt-2'>
            <h2>Top Cryptos</h2>
            <ul className='pt-2'>
                {cryptos.map((crypto) => (
                    <li key={crypto.id}>
                        <img src={crypto.image} alt={crypto.name} />
                        <div className='dataList'>
                            <h3 className='h4-w'>{crypto.symbol.toUpperCase()}</h3>
                            <div className="p-w">
                                <h4><b>${crypto.current_price.toLocaleString()}</b> </h4>
                            </div>
                            <div className="p-w">
                                <h4 style={{ color: crypto.price_change_percentage_24h < 0 ? '#F6465D' : '#24BD85' }}>
                                    <b>{crypto.price_change_percentage_24h < 0 ? '-' : '+'}
                                        {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%</b>
                                </h4>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CryptoList;
