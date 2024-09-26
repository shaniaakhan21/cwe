import DashboardIcon from '@mui/icons-material/Dashboard';
import LanIcon from '@mui/icons-material/Lan';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet'; 
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import LogoutIcon from '@mui/icons-material/Logout';

export const MenuList = [
    {
        title: 'Upgrade',	
        classsChange: 'mm-collapse',		
        iconStyle: <UpgradeIcon />,
        to: 'upgrade',
    },
    {
        title: 'Dashboard',	
        classsChange: 'mm-collapse',		
        iconStyle: <DashboardIcon />,
        to: 'dashboard',
    },
    {
        title: 'Exchanges',	
        classsChange: 'mm-collapse',		
        iconStyle: <CurrencyBitcoinIcon />, 
        to: 'exchanges',
    },
    {
        title: 'Spot Trading',	
        classsChange: 'mm-collapse',		
        iconStyle: <TrendingUpIcon />,
        content: [
            {
                title: 'Single Trading',
                to: 'single-trading',					
            },
            {
                title: 'Group Trading',
                to: 'group-trading',
            }          
        ],
    },
    {
        title: 'Futures Trading',	
        classsChange: 'mm-collapse',		
        iconStyle: <ScatterPlotIcon />,
        to: 'futures',
    },
    {
        title: 'Network',	
        classsChange: 'mm-collapse',		
        iconStyle: <LanIcon />,
        to: 'network'
    },
    {
        title: 'Wallet',	
        classsChange: 'mm-collapse',		
        iconStyle: <WalletIcon />,
        to: 'wallet'
    },
    {
        title: 'Leaders',	
        classsChange: 'mm-collapse',		
        iconStyle: <Diversity3Icon />,
        to: 'leaders'
    },
    {
        title: 'Feed',	
        classsChange: 'mm-collapse',		
        iconStyle: <NotificationImportantIcon />,
        to: 'Feed'
    },
    {
        title: 'Users [Admin]',	
        classsChange: 'mm-collapse',		
        iconStyle: <GroupIcon />,
        to: 'users',
        isAdmin: true
    },
    {
        title: 'Sales [Admin]',	
        classsChange: 'mm-collapse',		
        iconStyle: <MonetizationOnIcon />,  
        to: 'sales',
        isAdmin: true
    },
    {
        title: 'Logout',
        classsChange: 'mm-collapse',
        iconStyle: <LogoutIcon />,
        to: '#',
        onClick: 'logout', 
    }
];
