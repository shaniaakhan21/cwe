import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import logo from '../../../assets/images/publicpages/CWE-Logo1.png'

const Header = () => {
    return (
        <AppBar position="static" color="transparent" elevation={0} className='header-cwe'>
            <Toolbar>
                {/* Logo */}
                <Link href="#" sx={{ flexGrow: 1 }} className='w-10 mt-2'>
                    <img
                        src={logo}
                        className="w-50"
                        alt=""
                    />
                </Link>

                {/* Navigation Links */}
                <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'left', gap: 3 }} className='w-25 mt-3'>
                    <Link href="#" color="inherit" underline="none">
                        Markets
                    </Link>
                    <Link href="#" color="inherit" underline="none">
                        Buy Crypto
                    </Link>
                    <Link href="#" color="inherit" underline="none">
                        Earn
                    </Link>
                    <Link href="#" color="inherit" underline="none">
                        Contact
                    </Link>
                </Box>

                {/* Right-end Buttons */}
                <Box sx={{ display: 'flex', gap: 2 }} className='w-65 justify-content-end'>
                    <Button variant="outlined" color="inherit" className='btn-white-cwe'>Login</Button>
                    <Button variant="contained" className='btn-yellow-cwe'>Sign Up</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
