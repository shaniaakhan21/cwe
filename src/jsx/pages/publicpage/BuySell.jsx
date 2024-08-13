import { useState } from 'react';
import { Tabs, Tab, Box, TextField, Button, MenuItem } from '@mui/material';

const BuySell = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [currency, setCurrency] = useState('USD');
    const [crypto, setCrypto] = useState('BTC');

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    const currencies = ['USD', 'EUR', 'GBP'];
    const cryptos = ['BTC', 'ETH', 'USDT'];

    return (
        <div className='cryptos buysell py-3 px-5 mb-5 mt-2'>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Buy or Sell Tabs">
                <Tab label="Buy" />
                <Tab label="Sell" />
            </Tabs>
            <Box sx={{ mt: 3 }}>
                <TextField
                    label="Spend"
                    placeholder="Enter amount"
                    fullWidth
                    sx={{
                        mb: 2,
                        input: { color: 'white' },
                        '& .MuiInputLabel-root': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                    }}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        endAdornment: (
                            <TextField
                                select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                variant="standard"
                                sx={{
                                    width: '80px',
                                    marginLeft: '8px',
                                    input: { color: 'white' },
                                    '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                                    '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'white' },

                                }}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option} value={option} >
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        ),
                    }}
                />
                <TextField
                    label="Receive"
                    placeholder="0"
                    fullWidth
                    sx={{
                        mb: 2,
                        input: { color: 'white' },
                        '& .MuiInputLabel-root': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                    }}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        endAdornment: (
                            <TextField
                                select
                                value={crypto}
                                onChange={(e) => setCrypto(e.target.value)}
                                variant="standard"
                                sx={{
                                    width: '80px',
                                    marginLeft: '8px',
                                    input: { color: 'white' },
                                    '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                                    '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'white' },
                                }}
                            >
                                {cryptos.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        ),
                    }}
                />
                <br/>
                <div className='w-100 mt-10 mb-2'>
                    <Button variant="contained" className='btn-yellow-cwe padding-cstm-2 w-100'>
                        Log In / Sign Up
                    </Button>
                </div>
            </Box>
        </div>
    );
};

export default BuySell;
