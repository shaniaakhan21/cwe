import { Button } from "react-bootstrap";
import axiosInstance from "../../services/AxiosInstance";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types'; 

const Upgrade = ({ heading, subheading, listItems, buttonText }) => {
    const [sending, setSending] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 600); 
    };

    useEffect(() => {
        handleResize(); 
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleUpgrade = async () => {
        setSending(true);
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axiosInstance.post("/api/user/upgrade", {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error(error);
            setSending(false);
        }
    };

    return (
        <div className="col-md-3 m-1 p-2 text-center upgrade-p">
            <div >
                {subheading && <p>{subheading}</p>}
                <h3>{heading}</h3>
                <ol>
                    {listItems.map((item, index) => (
                        <li key={index}>
                            {isMobile 
                                ? item.split('\n').map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        <br />
                                    </span>
                                )) 
                                : item
                            }
                        </li>
                    ))}
                </ol>
                <Button disabled={sending} onClick={handleUpgrade} className="me-2" variant="success" style={{ marginTop: 20 }}>
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};

Upgrade.propTypes = {
    heading: PropTypes.string.isRequired,
    subheading: PropTypes.string,
    listItems: PropTypes.arrayOf(PropTypes.string).isRequired,
    buttonText: PropTypes.string.isRequired,
};

const UpgradeComponent = () => {
    return (
        <>
        <div className="upgrade-main-0"> 
            <div className="upgrade-main">
                <Upgrade
                    heading="Free"
                    subheading="Beginner"
                    listItems={[
                        "Real-time dashboard",
                        "Access to Multiple exchanges",
                        "Balance overview Easy Spot\nTrading", 
                        "Secure wallet",
                        "Networking & Follow Leaders",
                        "AI Solutions",
                        "Get Started Easily Today with our\nBeginner Plan"
                    ]}
                    buttonText="Start Trading" />
                <Upgrade
                    heading="100 $"
                    subheading="Pro starter"
                    listItems={[
                        "Real-time dashboard",
                        "Access to Multiple exchanges",
                        "Balance overview",
                        "Easy Spot Trading Secure wallet", 
                        "Networking & Follow Leaders",
                        "AI Solutions",
                        "Easily Trade up to $100K monthly"
                    ]}
                    buttonText="Upgrade Now!" />
                <Upgrade
                    heading="1000 $"
                    subheading="Premium"
                    listItems={[
                        "Real-time dashboard",
                        "Access to Multiple exchanges",
                        "Balance overview",
                        "Easy Spot Trading",
                        "Secure wallet",
                        "Networking & Follow Leaders",
                        "AI Solutions",
                        "Easily Trade up to $1M monthly"
                    ]}
                    buttonText="Upgrade Now!" />
                <Upgrade
                    heading="10000 $"
                    subheading="Expert"
                    listItems={[
                        "Real-time dashboard",
                        "Access to Multiple exchanges",
                        "Balance overview",
                        "Easy Spot Trading",
                        "Secure wallet",
                        "Networking & Follow Leaders",
                        "AI Solutions",
                        "Easily Trade up to $10M monthly"
                    ]}
                    buttonText="Upgrade Now!" />
            </div>
            </div>
        </>
    );
};

export default UpgradeComponent;
