import { useState } from 'react';
import { AppBar, Toolbar, Box, Link, Button, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X'; // X (Twitter) icon
import InstagramIcon from '@mui/icons-material/Instagram';
import TikTokYellowIcon from '../../../assets/images/tiktok-yellow.png'
import TikTokWhiteIcon from '../../../assets/images/tiktok-white.png'
import logo from '../../../assets/images/publicpages/CWE-Logo1.png'
import { useNavigate } from 'react-router-dom';
import TelegramIcon from '@mui/icons-material/Telegram';

const Footer = () => {
    const navigate = useNavigate();

    const handleNavigationSignUp = () => {
        navigate('/register');
    };

    const handleNavigationLogIn = () => {
        navigate('/login');
    };

    const [hovered, setHovered] = useState(false);

    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{ borderTop: '1px solid #FCD535', padding: '0' }} className='py-4 footer-cwe' >
            <Toolbar sx={{ backgroundColor: 'black!important', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'flex-start', padding: '0' }}>

                <Box sx={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
                    {/* Logo */}
                    <Link href="#" sx={{ flexGrow: 1 }} className='w-10 mt-2 widthSh3'>
                        <img
                            src={logo}
                            className="w-50"
                            alt="Logo Image"
                        />
                    </Link>

                    {/* Links */}
                    <Box sx={{ display: 'flex', gap: 5 }} className='w-25 widthSh2'>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} className='links-btm justify-content-center'>
                            <Link href="#" color="inherit" underline="none">
                                Home
                            </Link>
                            <Link href="/#markets-section" color="inherit" underline="none">
                                Markets
                            </Link>

                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} className='links-btm justify-content-center'>
                            <Link href="/#buy-crypto-section" color="inherit" underline="none">
                                Buy Crypto
                            </Link>
                            <Link href="/#earn-section" color="inherit" underline="none">
                                Earn
                            </Link>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} className='links-btm justify-content-center'>
                            <Link href="https://t.me/+EsQqUHblRMAyMmZk" color="inherit" underline="none">
                                <TelegramIcon className='telegramicon'/> Apps Chat
                            </Link>
                            <Link href="https://t.me/+RAuK2_qq-zJkOGM0" color="inherit" underline="none">
                                <TelegramIcon className='telegramicon' /> API Chat
                            </Link>
                        </Box>
                    </Box>

                    {/* Social Media Icons */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }} className='w-65 justify-content-end widthSh'>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton color="inherit" href="https://www.facebook.com/profile.php?id=61565491131625" className='text-our-yellow icons-us'>
                                <FacebookIcon />
                            </IconButton>
                            <IconButton color="inherit" href="https://x.com/cwebuster58173" className='text-our-yellow icons-us'>
                                <XIcon />
                            </IconButton>
                            <IconButton color="inherit" href="https://www.instagram.com/cwebuster/" className='text-our-yellow icons-us'>
                                <InstagramIcon />
                            </IconButton>
                            <a className='d-flex align-items-center' onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)} href="https://www.tiktok.com/@cwebuster"><img src={hovered ? TikTokWhiteIcon : TikTokYellowIcon} className='tiktok' alt="TikTok Icon" /></a>
                        </Box>
                        {/* Buttons */}
                        <Box sx={{ display: 'flex', gap: 1 }} className='w-25 justify-content-end'>
                            <Button variant="outlined" color="inherit" className='btn-white-cwe  padding-cstm' onClick={handleNavigationLogIn}>Login</Button>
                            <Button variant="contained" className='btn-yellow-cwe  padding-cstm' onClick={handleNavigationSignUp}>Sign Up</Button>
                        </Box>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Footer;
