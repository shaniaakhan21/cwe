import { useEffect, useState } from 'react';
import { Alert, Button, Nav, Tab } from 'react-bootstrap';
import Select from "react-select";
import axiosInstance from '../../services/AxiosInstance';
import { isAxiosError } from 'axios';
import TradingTable from './TradingTable';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";


const Trading = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [stopgain, setStopGain] = useState(3);
    const [stoploss, setStopLoss] = useState(99);
    const [balance, setBalance] = useState(undefined);
    const [investment, setInvesment] = useState(0);
    const [errorSaving, setErrorSaving] = useState('');
    const [saving, setSaving] = useState(false);

    console.log(selectedOption)


    const getCoins = async () => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await axiosInstance.get("/api/robots/getCoins", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const options = []
                for (const coin of response.data.coins) {
                    options.push({ value: coin.mercado, label: coin.coin })
                }
                setOptions(options)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getUSDTBalance = async () => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await axiosInstance.get("/api/robots/getUSDTBalance", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBalance(response.data.balance)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getCoins()
        getUSDTBalance()
    }, [])

    const createHybrid = async () => {
        setSaving(true)
        try {
            const token = localStorage.getItem('token')
            if (token) {
                await axiosInstance.post("/api/robots/createHybrid", {
                    investment: investment,
                    mercado: selectedOption ? selectedOption.value : null,
                    stopgain,
                    stoploss
                },
                     {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSelectedOption(null)
                setInvesment(0)
                setStopGain(3)
                setStopLoss(99)
                await getHybridTrades()
            }
        } catch (error) {
            if(isAxiosError(error)){
                const { response } = error;
                if (response?.status === 400) {
                  const { data } = response;
                  setErrorSaving(data.message);
                }
            }
        }
        setSaving(false)
    }

    const [rows, setRows] = useState([])
    const getHybridTrades = async () => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await axiosInstance.get("/api/robots/getHybridTrades", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRows(response.data.trades)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="row">

                <div className="col-xl-4">
                    <div className="card">
                        <div className="card-header border-0 pb-0">
                            <h4 className="card-title mb-0">New Hybrid</h4>
                        </div>
                        <div className="card-body pt-2">

                        <Alert variant="danger" show={errorSaving.length > 0}>
                            <strong>Error! </strong> {errorSaving}
                        </Alert>
                            <div className="d-flex align-items-center justify-content-between mt-3 mb-2">
                                <span className="small text-muted">Available Balance</span>

                                {balance === undefined && (
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                )}
                                {(balance !== null && balance !== undefined) && (
                                    <span className="text-dark">{balance} USDT</span>
                                )}
                            </div>
                            <form>
                                <div className="mb-3">
                                    <Select
                                        placeholder="Select Coin"
                                        value={selectedOption}
                                        onChange={setSelectedOption}
                                        options={options}
                                        style={{
                                            lineHeight: "40px",
                                            color: "#7e7e7e",
                                            paddingLeft: " 15px",
                                        }}
                                    />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Investment</span>
                                    <input type="text" value={investment} onChange={(e) => {setInvesment(e.target.value)} } className="form-control" />
                                    <span className="input-group-text">USDT</span>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Stop Gain</span>
                                    <input type="text" value={stopgain} onChange={(e) => {setStopGain(e.target.value)} } className="form-control" />
                                    <span className="input-group-text">%</span>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Stop Loss</span>
                                    <input type="text" value={stoploss} onChange={(e) => {setStopLoss(e.target.value)} }  className="form-control" />
                                    <span className="input-group-text">%</span>
                                </div>


                                <div className="mt-3 d-flex justify-content-between">
                                    <Button disabled={saving || !balance} onClick={() =>{createHybrid()}} variant="success" className="btn btn-sm  text-uppercase  btn-block">Start Hybrid</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-xl-8">
                <div className="card">
                    {selectedOption && (
                        <AdvancedRealTimeChart symbol={`${selectedOption.label}USDT`} autosize></AdvancedRealTimeChart>
                    )}
                    {!selectedOption && (
                        <div style={{textAlign: "center", marginTop: 50}}>
 <h3>Select a Coin to see the graph</h3>
                            </div>
                       
                    )}
                </div>
                </div>

                <div className="col-xl-12">
                    <div className="card">
                        <Tab.Container defaultActiveKey={'Open'}>
                            <div className="card-header border-0 pb-3 flex-wrap">
                                <h4 className="card-title">My Orders</h4>
                                <nav>
                                    <Nav as="div" className="nav-pills light" >
                                        <Nav.Link onClick={() => getHybridTrades() } as="button" eventKey="Open">Refresh</Nav.Link>
                                    </Nav>
                                </nav>
                            </div>
                            <div className="card-body pt-0">
                                <TradingTable getHybridTrades={getHybridTrades} rows={rows} />
                            </div>
                        </Tab.Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Trading;