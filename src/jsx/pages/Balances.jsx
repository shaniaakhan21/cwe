import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axiosInstance from "../../services/AxiosInstance";

import Binance from "../../assets/images/exchanges/binance.png";
import KuCoin from "../../assets/images/exchanges/kucoin.png";
import HTX from "../../assets/images/exchanges/htx.png";
import Okx from "../../assets/images/exchanges/okx.png";
import GateIo from "../../assets/images/exchanges/gate.io.png";
import Kraken from "../../assets/images/exchanges/kraken.png";
import Coinbase from "../../assets/images/exchanges/coinbase.png";
import Bybit from "../../assets/images/exchanges/bybit.png";
import BalancesTable from "./BalancesTable";
const exchanges = {
    'plataforma-3': { name: "Binance", logo: Binance },
    'plataforma-4': { name: "KuCoin", logo: KuCoin },
    'plataforma-5': { name: "HTX", logo: HTX },
    'plataforma-6': { name: "OKX", logo: Okx },
    'plataforma-7': { name: "Gate.io", logo: GateIo },
    'plataforma-8': { name: "Kraken", logo: Kraken },
    'plataforma-9': { name: "Coinbase", logo: Coinbase },
    'plataforma-10': { name: "Bybit", logo: Bybit },
};

const Balances = () => {
    const [apikeys, setApiKeys] = useState(undefined);
    const [selectedExchange, setSelectedExchange] = useState(null);


    const getAllApiKeys = async () => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await axiosInstance.get("/api/robots/getAllApiKeys", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return setApiKeys(response.data.apiKeys)
            }
        } catch (error) {
            console.error(error)
        }
        return setApiKeys(null)
    }

    useEffect(() => {
        getAllApiKeys()
    }, [])

    const currentExchange = selectedExchange !== null ? exchanges[selectedExchange] : null;

    return (
        <>
            {selectedExchange !== null && (
                <div className='d-flex flex-row justify-content-between align-items-center' style={{ textAlign: "left", fontSize: 17, marginBottom: 5 }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={currentExchange.logo}
                            alt={currentExchange.name}
                            className="w-70"
                        />
                    </div>

                    <Button onClick={() => { setSelectedExchange(null); }} variant="danger" className=" cancel-chng btn btn-danger">
                        Go Back
                    </Button>
                </div>
            )}
            {selectedExchange === null && (
                <div className="row d-flex justify-content-between">
                    {exchanges && Object.keys(exchanges).map((platformId) => {
                        const apiKey = apikeys ? apikeys.find(key => key.idPlataforma === parseInt(platformId.split('-')[1])) : null;
                        const isBinance = platformId === 'plataforma-3';
                        if (!apiKey) return null
                        return (
                            <div key={`platform-${platformId}`} className="col-11 col-md-3 m-2 mb-3 d-flex justify-content-center" style={{ border: "1px solid #2B3139", padding: '10px 2px 20px 2px', borderRadius: '3px' }}>
                                <div className="d-flex-it">
                                    <div style={{ textAlign: "center" }} className="w-full">
                                        <img src={exchanges[platformId].logo} alt="Exchange" style={{ height: '100px', width: '100%' }} />
                                    </div>
                                    <div style={{ textAlign: "center", fontSize: 17, marginTop: 10 }}>
                                        {apiKey ? `ApiKey: ...${apiKey.last4}` : (isBinance ? '' : 'Coming Soon')}
                                    </div>
                                    <div style={{ textAlign: "center", fontSize: 17, marginTop: 10 }}>
                                        <Button onClick={() => { setSelectedExchange(platformId) }} variant="success" className="btn-block yellow-newbtn" style={{ marginTop: 20 }}>View Balances</Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {apikeys === undefined && (
                <div style={{ textAlign: "center", marginTop: 50 }}>
                    <div className="spinner-border" style={{ width: "8rem", height: "8rem" }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {selectedExchange !== null && (
                <BalancesTable idPlataforma={selectedExchange} />
            )}
        </>
    );
};

export default Balances;