import { useState } from 'react';
import { IconButton } from '@mui/material';
import { WhatsApp, Telegram, Facebook, Instagram, Link as LinkIcon, Download } from '@mui/icons-material';
import PropTypes from 'prop-types';
import ImageOne from '../../../assets/images/marketingmaterilas/MarketingTools-1.png'
import ImageTwo from '../../../assets/images/marketingmaterilas/MarketingTools-2.png'
import ImageThree from '../../../assets/images/marketingmaterilas/MarketingTools-3.png'
import ImageFour from '../../../assets/images/marketingmaterilas/MarketingTools-4.png'
import { Snackbar, Alert } from '@mui/material';

const ImageWithActions = ({ imageSrc, referralLink }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleShare = (platform) => {
        const message = `Check out this referral link: ${referralLink}`;
        const encodedMessage = encodeURIComponent(message);
        const url = encodeURIComponent(referralLink);
        let shareUrl = '';

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodedMessage}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${url}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'instagram':
                shareUrl = `https://www.instagram.com`;
                break;
            case 'link':
                if (navigator.clipboard) {
                    // Try using modern Clipboard API
                    navigator.clipboard.writeText(referralLink).then(() => {
                        setOpenSnackbar(true);
                    }).catch((err) => {
                        const textArea = document.createElement('textarea');
                        textArea.value = referralLink;
                        textArea.style.position = 'fixed'; 
                        textArea.style.left = '-9999px';
                        document.body.appendChild(textArea);
                        textArea.focus();
                        textArea.select();
                        try {
                            document.execCommand('copy');
                            setOpenSnackbar(true);
                        } catch (err) {
                            console.error('Fallback: Oops, unable to copy', err);
                        }
                        document.body.removeChild(textArea);
                    });
                } else {
                    const textArea = document.createElement('textarea');
                    textArea.value = referralLink;
                    textArea.style.position = 'fixed'; 
                    textArea.style.left = '-9999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        setOpenSnackbar(true);
                    } catch (err) {
                        console.error('Fallback: Oops, unable to copy', err);
                    }
                    document.body.removeChild(textArea);
                }
                break;
            default:
                break;
        }

        if (shareUrl) window.open(shareUrl, '_blank');
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = 'CWEBooster.png';
        link.click();
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="image-with-actions mb-4">
            <img src={imageSrc} alt="Marketing" className='p-2  border-yellow-02 img-post' />
            <div className="icon-buttons bg-light-greyish p-2 d-flex flex-row justify-content-between">
                <IconButton onClick={() => handleShare('whatsapp')}>
                    <WhatsApp />
                </IconButton>
                <IconButton onClick={() => handleShare('telegram')}>
                    <Telegram />
                </IconButton>
                <IconButton onClick={() => handleShare('facebook')}>
                    <Facebook />
                </IconButton>
                <IconButton onClick={() => handleShare('instagram')}>
                    <Instagram />
                </IconButton>
                <IconButton onClick={() => handleShare('link')}>
                    <LinkIcon />
                </IconButton>
                <IconButton onClick={handleDownload}>
                    <Download />
                </IconButton>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', backgroundColor: '#FCD535;',
						color: '#fff', }}>
                    Referral Link Copied to Clipboard
                </Alert>
            </Snackbar>
        </div>
    );
};

ImageWithActions.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    referralLink: PropTypes.string.isRequired,
};

const Marketing = ({ referralLink }) => {


    return (
        <>
            <div className="page-market">
                <h2>Marketing Tools</h2>
                <p>Share on your social media to get additional boost right now!</p>
                <div className='all-posts'>
                    <ImageWithActions
                        imageSrc={ImageOne}
                        referralLink={referralLink}
                    />
                    <ImageWithActions
                        imageSrc={ImageTwo}
                        referralLink={referralLink}
                    />
                    <ImageWithActions
                        imageSrc={ImageThree}
                        referralLink={referralLink}
                    />
                    <ImageWithActions
                        imageSrc={ImageFour}
                        referralLink={referralLink}
                    />
                </div>
            </div>
        </>
    );
};

Marketing.propTypes = {
    referralLink: PropTypes.string.isRequired,
};

export default Marketing;
