import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import logo from '../../../assets/images/logo-white.png';


const Header = ({ bgColor = '#000!important' }) => {

    return (
        <AppBar position="sticky" color="transparent" elevation={0} className='header-cwe' style={{ backgroundColor: bgColor }}>
            <Toolbar style={{ backgroundColor: bgColor, width: '25%' }}>
                {/* Logo */}
                <Link href="https://www.cwebooster.com/" sx={{ flexGrow: 1 }} className='w-100 mt-2'>
                    <img
                        src={logo}
                        className="ImgPhn"
                        alt="Logo"
                    />
                </Link>

            </Toolbar>
        </AppBar>
    );
}

export default Header;
