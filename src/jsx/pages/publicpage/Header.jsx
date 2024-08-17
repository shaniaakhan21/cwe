import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import logo from '../../../assets/images/publicpages/CWE-Logo1.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    const handleNavigationSignUp = () => {
        navigate('/register');
    };

    const handleNavigationLogIn = () => {
        navigate('/login');
    };

    return (
        <AppBar position="static" color="transparent" elevation={0} className='header-cwe'>
            <Toolbar>
                {/* Logo */}
                <Link href="#" sx={{ flexGrow: 1 }} className='w-10 mt-2'>
                    <img
                        src={logo}
                        className="ImgPhn"
                        alt="Logo"
                    />
                </Link>

                {/* Navigation Links for Desktop */}
                {!isMobile && (
                    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'left', gap: 3 }} className='w-25 mt-3'>
                        <Link href="/#markets-section" color="inherit" underline="none">
                            Markets
                        </Link>
                        <Link href="/#buy-crypto-section" color="inherit" underline="none">
                            Buy Crypto
                        </Link>
                        <Link href="/#earn-section" color="inherit" underline="none">
                            Earn
                        </Link>
                    </Box>
                )}

                {/* Right-end Buttons or Mobile Menu */}
                {isMobile ? (
                    <>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenu}
                            sx={{ ml: 2 }}
                        >
                            {anchorEl ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                        <Menu
                            className='headerMenu'
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <Link href="#" sx={{ flexGrow: 1 }} className='w-10 mt-2'>
                                    <img
                                        src={logo}
                                        className="w-10 ImgPhn"
                                        alt="Logo"
                                    />
                                </Link>
                                <IconButton edge="start" color="inherit" aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                            </MenuItem>
                            <MenuItem onClick={handleClose}><Link href="/#markets-section" color="inherit" underline="none">Markets</Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link href="/#buy-crypto-section" color="inherit" underline="none">Buy Crypto</Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link href="/#earn-section" color="inherit" underline="none">Earn</Link></MenuItem>
                            <MenuItem onClick={handleClose}><Button variant="outlined" color="inherit" className='btn-white-cwe padding-cstm-2' onClick={handleNavigationLogIn}>Login</Button></MenuItem>
                            <MenuItem onClick={handleClose}><Button variant="contained" className='btn-yellow-cwe padding-cstm-2' onClick={handleNavigationSignUp}>Sign Up</Button></MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', gap: 2 }} className='w-65 justify-content-end'>
                        <Button variant="outlined" color="inherit" className='btn-white-cwe padding-cstm-2'  onClick={handleNavigationLogIn}>Login</Button>
                        <Button variant="contained" className='btn-yellow-cwe padding-cstm-2' onClick={handleNavigationSignUp}>Sign Up</Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
