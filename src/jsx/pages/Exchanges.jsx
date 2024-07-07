import { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import axiosInstance from "../../services/AxiosInstance";
import Swal from "sweetalert2";

import Binance from "../../assets/images/plataforma-3.png";
import { isAxiosError } from "axios";
const exchanges = {
    'plataforma-3': Binance,
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
            if(isAxiosError(error)){
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


    return (
        <>
            <div style={{ textAlign: "right" }}>
                <Button className="me-2" variant="success" onClick={() => { openModal(), setErrorSaving("") }}>
                    <i className="fa-solid fa-add me-2"></i> Add Exchange
                </Button>
            </div>
            <hr></hr>

            <div className="row">
                {apikeys && apikeys.map((apiKey) => {
                    return (
                        <div key={apiKey.id} className="col-12 col-md-3" style={{ border: "1px solid grey", padding: 20, borderRadius: 10 }}>
                            <div style={{ textAlign: "center" }}>

                                <img src={exchanges[`plataforma-${apiKey.idPlataforma}`]} alt="Binance" style={{ width: "80%" }} />
                            </div>
                            <div style={{ textAlign: "center", fontSize: 17, marginTop: 10 }}>
                                ApiKey: ...{apiKey.last4}
                            </div>
                            <Button onClick={() => { verifyDelete(apiKey.id) }} variant="danger" className="btn-block" style={{ marginTop: 20 }}>Delete Api Key</Button>
                        </div>
                    )
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



                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={savingApiKey} onClick={() => { saveApiKey() }} variant="primary">
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