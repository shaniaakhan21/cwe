import { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import axiosInstance from "../../services/AxiosInstance";
import Swal from "sweetalert2";

import Binance from "../../assets/images/exchanges/binance.png";
import KuCoin from "../../assets/images/exchanges/kucoin.png";
import HTX from "../../assets/images/exchanges/htx.png";
import Okx from "../../assets/images/exchanges/okx.png";
import GateIo from "../../assets/images/exchanges/gate.io.png";
import Kraken from "../../assets/images/exchanges/kraken.png";
import Coinbase from "../../assets/images/exchanges/coinbase.png";
import Bybit from "../../assets/images/exchanges/bybit.png";
import { isAxiosError } from "axios";
const exchanges = {
    'plataforma-3': Binance,
    'plataforma-4': KuCoin,
    'plataforma-5': HTX,
    'plataforma-6': Okx,
    'plataforma-7': GateIo,
    'plataforma-8': Kraken,
    'plataforma-9': Coinbase,
    'plataforma-10': Bybit,
}

const Exchanges = () => {
    const [showModal, setShowModal] = useState(false);
    const [savingApiKey, setSavingApiKey] = useState(false);
    const [idPlataforma, setidPlataforma] = useState(3);
    const [apikeys, setApiKeys] = useState(undefined);
    const [apikey, setApikey] = useState("");
    const [secret, setSecret] = useState("");
    const [errorSaving, setErrorSaving] = useState('');

    const openModal = () => {
        setApikey("");
        setSecret("");
        setShowModal(true);
    }

    const saveApiKey = async () => {
        setSavingApiKey(true)
        try {
            const token = localStorage.getItem('token')
            if (token) {
                await axiosInstance.post("/api/robots/addExchange", {
                    exchange: "binance",
                    apikey,
                    secret,
                    idPlataforma
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setApiKeys(undefined)
                await getAllApiKeys()
                setShowModal(false)
            }
        } catch (error) {
            if (isAxiosError(error)) {
                const { response } = error;
                if (response?.status === 400) {
                    const { data } = response;
                    setErrorSaving(data.message);
                }
            }
            console.error(error)
        }
        setSavingApiKey(false)

    }

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

    const verifyDelete = async (id) => {

        Swal.fire({
            title: 'Are you sure to delete ?',
            text: "All your Hybrid Bots will stop working, until you add a new ApiKey",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dd6b55',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteApiKey(id)
            }
        })
    }

    const deleteApiKey = async (id) => {
        setApiKeys(undefined)
        try {
            const token = localStorage.getItem('token')
            if (token) {
                await axiosInstance.post("/api/robots/deleteApiKey", {
                    id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        } catch (error) {
            console.error(error)
        }
        await getAllApiKeys()
    }

    const exchangeLinks = {
        'plataforma-5': 'https://www.htx.com/invite/en-us/1f?invite_code=dyma4',
        'plataforma-6': 'https://www.okx.com/join/10134391',
        'plataforma-7': 'https://www.gate.io/signup/UAUQXF1W?ref_type=103',
    };



    return (
        <>
            <div style={{ textAlign: "right", marginTop: 0 }}>
                <Button variant="success" className="mb-4" onClick={() => { openModal(), setErrorSaving("") }}>
                    <i className="fa-solid fa-add me-2"></i>
                    {apikeys && apikeys.length === 0 ? "Add Exchange" : "Add Exchange"}
                </Button>
            </div>

            <div className="row d-flex justify-content-between">
                {exchanges && Object.keys(exchanges).map((platformId) => {
                    const apiKey = apikeys ? apikeys.find(key => key.idPlataforma === parseInt(platformId.split('-')[1])) : null;
                    const isBinance = platformId === 'plataforma-3';
                    return (
                        <div key={`platform-${platformId}`} className="col-11 col-md-3 m-2 mb-3 d-flex justify-content-center" style={{ border: "1px solid #2B3139", padding: '10px 2px 20px 2px', borderRadius: '3px' }}>
                            <div className="d-flex-it">
                                <div style={{ textAlign: "center" }} className="w-full">
                                    <img src={exchanges[platformId]} alt="Exchange" style={{ height: '100px', width: '100%' }} />
                                </div>
                                <div style={{ textAlign: "center", fontSize: 17, marginTop: 10 }}>
                                    {apiKey ? `ApiKey: ...${apiKey.last4}` : (isBinance ? '' : 'Coming Soon')}
                                </div>
                                <div style={{ textAlign: "center", fontSize: 17, marginTop: 10 }}>
                                    {apiKey ? (
                                        <Button onClick={() => { verifyDelete(apiKey.id) }} className="btn-block w-fit cancel-chng" style={{ marginTop: 20 }}>Delete Api Key</Button>
                                    ) : (
                                        <Button target="_blank" href={exchangeLinks[platformId]} variant="success" className="btn-block yellow-newbtn" style={{ marginTop: 20 }}>Create Account</Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {apikeys === undefined && (
                <div style={{ textAlign: "center", marginTop: 50 }}>
                    <div className="spinner-border" style={{ width: "8rem", height: "8rem" }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            <Modal className="fade" show={showModal} onHide={() => { setShowModal(false) }}>
                <Modal.Header>
                    <Modal.Title>Add Exchange</Modal.Title>
                    <Button variant="" className="btn-close" onClick={() => { setShowModal(false) }}></Button>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="danger" show={errorSaving.length > 0}>
                        <strong>Error! </strong> {errorSaving}
                    </Alert>

                    Select Exchange
                    <select onChange={(e) => { setidPlataforma(e.target.value) }} className="form-control">
                        <option value="3" selected={idPlataforma === 3} >Binance</option>
                    </select>

                    <br />
                    API Key
                    <input type="text" value={apikey} onChange={(e) => { setApikey(e.target.value) }} className="form-control" />

                    <br />
                    API Secret
                    <input type="text" value={secret} onChange={(e) => { setSecret(e.target.value) }} className="form-control" />

                    <Alert variant="warning" show={true} style={{ marginTop: 20 }}>
                        <strong>IMPORTANT! </strong>
                        <br />
                        <br />You must enable the following ip on your account:
                        <br /><br />
                        <li>* 165.227.170.107</li>
                    </Alert>

                    <Alert variant="danger" show={true} style={{ marginTop: 20 }}>
                        <strong>IMPORTANT! </strong>
                        <br />
                        <br />You need to enable trading permissions
                    </Alert>


                    <Alert variant="warning" show={true} style={{ marginTop: 20 }}>
                        <strong>ACTION! </strong>
                        <br />
                        <br />
                        <a style={{ color: '#FFAB2D' }} rel="noreferrer" href="https://www.youtube.com/watch?v=pdvzeHSd0f0" target="_blank">
                            Click here for Tutorial for creating Binance API KEY
                        </a>
                    </Alert>

                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={savingApiKey} onClick={() => { saveApiKey() }} variant="success">
                        {savingApiKey ?
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> : "Save Exchange"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Exchanges;