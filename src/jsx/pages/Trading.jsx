/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Alert, Button, Nav, Tab } from 'react-bootstrap';
import Select from "react-select";
import axiosInstance from '../../services/AxiosInstance';
import { isAxiosError } from 'axios';
import TradingTable from './TradingTable';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import Swal from 'sweetalert2';
import { TechnicalAnalysis } from "react-ts-tradingview-widgets";
import { useParams } from 'react-router-dom';


const Trading = (props) => {
    const { mercado } = useParams();
    const [selectedOption, setSelectedOption] = useState({ value: 'BTC', label: 'BTC' })
    const [options, setOptions] = useState([]);
    const [stopgain, setStopGain] = useState(3);
    const [stoploss, setStopLoss] = useState(99);
    const [balance, setBalance] = useState(undefined);
    const [investment, setInvesment] = useState(0);
    const [errorSaving, setErrorSaving] = useState('');
    const [saving, setSaving] = useState(false);
    const [meStopGain, setMeStopGain] = useState(0);

    useEffect(() => {
        if (mercado) {
            setSelectedOption({ value: mercado, label: mercado.split("-")[1] })
        }
    }, [mercado])

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

    const [me, setMe] = useState(null)


    const fetchMe = async () => {

        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await axiosInstance.get("/api/user/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setMe(response.data.user)
                setMeStopGain(response.data.user.stopgain)
            }
        } catch (error) {
            // do nothing
            console.log(error)
        }
    }

    useEffect(() => {
        getCoins()
        getUSDTBalance()
        fetchMe();
    }, [])

    const updateStopGain = async () => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                await axiosInstance.post("/api/user/updateStopGain", {
                    stopgain: meStopGain
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
            }
        } catch (error) {
            if (isAxiosError(error)) {
                const { response } = error;
                if (response?.status === 400) {
                    const { data } = response;
                    Swal.fire({
                        title: "Error",
                        text: data.message,
                        icon: 'error',
                        showCancelButton: false,
                    })
                }
            }
        }
        setSaving(false)
    }

    const createHybrid = async () => {
        setSaving(true)
        try {
            const token = localStorage.getItem('token')
            if (token) {
                await axiosInstance.post("/api/robots/createHybrid", {
                    investment: investment,
                    mercado: selectedOption ? selectedOption.value : null,
                    stopgain,
                    stoploss,
                    type: props.type
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
            if (isAxiosError(error)) {
                const { response } = error;
                if (response?.status === 400) {
                    const { data } = response;
                    setErrorSaving(data.message);
                }
            }
        }
        setSaving(false)
    }

    const sellAllGroup = async () => {

        Swal.fire({
            title: "Do you want to sell all your group?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token')
                    if (token) {
                        await axiosInstance.post("/api/robots/sellAllGroup", {},
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            });

                    }
                } catch (error) {
                    if (isAxiosError(error)) {
                        const { response } = error;
                        if (response?.status === 400) {
                            const { data } = response;
                            Swal.fire({
                                title: "Error",
                                text: data.message,
                                icon: 'error',
                                showCancelButton: false,
                            })
                        }
                    }
                }
            }
        });

    }






    const [rows, setRows] = useState([])
    const getHybridTrades = async () => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await axiosInstance.get("/api/robots/getHybridTrades", {
                    params: {
                        type: props.type
                    },
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

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#cea62d80', // Background color of the control
            borderColor: state.isFocused ? '#cea62d80' : '#7e7e7e', // Border color based on focus state
            boxShadow: state.isFocused ? '0 0 0 1px #cea62d80' : null, // Box shadow on focus
            '&:hover': {
                borderColor: '#cea62d80' // Border color on hover
            },
            color: '#7e7e7e', // Text color
            padding: '0 15px', // Padding inside the control
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#7e7e7e', // Placeholder text color
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#fff', // Selected option text color
        }),
        menu: (provided) => ({
            ...provided,
            borderColor: '#cea62d80',
            border: '1px solid #cea62d80',
            backgroundColor: '#cea62d80'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#000' : '#cea62d80', // Background color on hover
            color: state.isFocused ? '#fff' : '#fff', // Text color on hover
        }),
    };

    return (
        <>
            <div className="col">
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
                                            styles={customStyles}
                                            style={{
                                                lineHeight: "40px",
                                                color: "#7e7e7e",
                                                paddingLeft: " 15px",
                                            }}
                                        />
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Investment</span>
                                        <input type="text" value={investment} onChange={(e) => { setInvesment(e.target.value) }} className="form-control" />
                                        <span className="input-group-text">USDT</span>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Stop Gain</span>
                                        <input type="text" value={stopgain} onChange={(e) => { setStopGain(e.target.value) }} className="form-control" />
                                        <span className="input-group-text">%</span>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Stop Loss</span>
                                        <input type="text" value={stoploss} onChange={(e) => { setStopLoss(e.target.value) }} className="form-control" />
                                        <span className="input-group-text">%</span>
                                    </div>


                                    <div className="mt-3 d-flex justify-content-between">
                                        <Button disabled={saving || !balance} onClick={() => { createHybrid() }} variant="success" className="btn btn-sm  text-uppercase  btn-block">Start Hybrid</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {selectedOption && (
                        <div className="col-xl-8">
                            <div className="card" style={{ height: '100%' }}>
                                <>
                                    <TechnicalAnalysis symbol={`${selectedOption.label}USDT`} colorTheme="dark" width="100%"></TechnicalAnalysis>
                                </>
                            </div>
                        </div>
                    )}
                    {/* {!selectedOption && (
                        <div className="col-xl-8 card-select">
                            <div className='card-in col-xl-8'>
                                <img width={60} src={selectIcon} />
                                <h3>Select a Coin to get Technical<br /> Analysis and  AAVEUSDT Chart</h3>
                            </div>
                        </div>

                    )} */}
                </div>
                {selectedOption && (
                    <div className="col-xl-12">
                        <div className="card" style={{ height: 500 }}>

                            <>
                                <AdvancedRealTimeChart symbol={`${selectedOption.label}USDT`} colorTheme="dark" autosize></AdvancedRealTimeChart>
                            </>
                        </div>
                    </div>
                )}






                {props.type === 'group' && (

                    <div className="col-xl-12">
                        <div className="card card-btn-b-y">
                            <div className="card-header yellow-it">
                                <h4 className="card-title mb-0">Stop Profit Global</h4>
                                <Button onClick={() => { sellAllGroup() }} variant="dark" className="btn btn-sm  text-uppercase ">Sell All Group NOW</Button>
                            </div>
                            <div className="card-body pt-2" style={{ fontSize: 18 }}>
                                <div className='d-flex justify-content-between p-1' >
                                    <h4 className='w-50'>Current Global Investment:</h4><h4 className='w-50 text-end'><span >{Number(me?.investment).toFixed(2)} USDT</span></h4>  <br />
                                </div>
                                <div className='d-flex justify-content-between p-1' style={{ borderTop: '1px solid #cea62d' }}>
                                    <h4 className='w-50'>Current Global Profit USDT: </h4><h4 className='w-50 text-end'><span style={{ color: Number(me?.profit_usd) > 0 ? 'green' : "#fd5353" }}>{Number(me?.profit_usd).toFixed(2)} USDT</span></h4>  <br />
                                </div>
                                <div className='d-flex justify-content-between p-1' style={{ borderTop: '1px solid #cea62d' }}>
                                    <h4 className='w-50'>Current Global Profit %:</h4><h4 className='w-50 text-end'><span style={{ color: Number(me?.profit) > 0 ? 'green' : "#fd5353" }}>{Number(me?.profit).toFixed(2)} %</span></h4>  <br />
                                </div>

                                <div style={{ marginTop: 10, borderTop: '1px solid #cea62d', paddingTop: 10 }} className='d-flex justify-content-between align-items-center'>
                                    <h4>Closes At </h4>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <input type="text" value={meStopGain} onChange={(e) => { setMeStopGain(e.target.value) }} />
                                        <Button style={{ marginLeft: 20 }} onClick={() => { updateStopGain() }} variant="success" className="btn py-2 text-uppercase ">Save</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="col-xl-12">
                    <div className="card">
                        <Tab.Container defaultActiveKey={'Open'}>
                            <div className="card-header border-0 pb-3 flex-wrap">
                                <h4 className="card-title">My Orders</h4>
                                <nav>
                                    <Nav as="div" className="nav-pills light" >
                                        <Nav.Link onClick={() => { getHybridTrades(); fetchMe(); }} as="button" eventKey="Open">Refresh</Nav.Link>
                                    </Nav>
                                </nav>
                            </div>
                            <div className="card-body pt-0 trading-tb p-0">
                                <TradingTable getHybridTrades={getHybridTrades} type={props.type} rows={rows} />
                            </div>
                        </Tab.Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Trading;