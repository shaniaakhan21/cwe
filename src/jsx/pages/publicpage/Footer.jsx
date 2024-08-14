import { AppBar, Toolbar, Box, Link, Button, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X'; // X (Twitter) icon
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logo from '../../../assets/images/publicpages/CWE-Logo1.png'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    const handleNavigationSignUp = () => {
        navigate('/register');
    };

    const handleNavigationLogIn = () => {
        navigate('/login');
    };
    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{ borderTop: '1px solid #cea62d', padding: '0' }} className='py-4 footer-cwe' >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'flex-start', padding: '0' }}>

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
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} className='links-btm'>
                            <Link href="#" color="inherit" underline="none">
                                Home
                            </Link>
                            <Link href="#" color="inherit" underline="none">
                                Markets
                            </Link>
                            <Link href="#" color="inherit" underline="none">
                                Earn
                            </Link>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} className='links-btm'>
                            <Link href="#" color="inherit" underline="none">
                                Contact
                            </Link>
                            <Link href="#" color="inherit" underline="none">
                                Buy Crypto
                            </Link>
                        </Box>
                    </Box>

                    {/* Social Media Icons */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }} className='w-65 justify-content-end widthSh'>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton color="inherit" href="#" className='text-our-yellow icons-us'>
                                <FacebookIcon />
                            </IconButton>
                            <IconButton color="inherit" href="#" className='text-our-yellow icons-us'>
                                <XIcon />
                            </IconButton>
                            <IconButton color="inherit" href="#" className='text-our-yellow icons-us'>
                                <InstagramIcon />
                            </IconButton>
                            <IconButton color="inherit" href="#" className='text-our-yellow icons-us'>
                                <LinkedInIcon />
                            </IconButton>
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
