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
import './Trading.css'


const Trading = (props) => {
    const { mercado } = useParams();
    const [selectedOption, setSelectedOption] = useState(undefined)
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
            backgroundColor: '#FCD53580', // Background color of the control
            borderColor: state.isFocused ? '#FCD53580' : '#7e7e7e', // Border color based on focus state
            boxShadow: state.isFocused ? '0 0 0 1px #FCD53580' : null, // Box shadow on focus
            '&:hover': {
                borderColor: '#FCD53580' // Border color on hover
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
            borderColor: '#FCD53580',
            border: '1px solid #2B313980',
            backgroundColor: '#FCD53580'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#000' : '#FCD53580', // Background color on hover
            color: state.isFocused ? '#fff' : '#fff', // Text color on hover
        }),
    };

    return (
        <>
            <div className="col">
                <div className="row">

                    <div className="col-xl-6">
                        <div className="card border-white-leaders">
                            <div className="card-header border-0 pb-0">
                                <h4 className="card-title mb-0">New Hybrid</h4>
                            </div>
                            <div className="card-body pt-2">

                                <div className={` ${errorSaving ? 'show notify' : ''}`}>
                                    {errorSaving}
                                </div>

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
                                        <input type="text" value={investment} onChange={(e) => { setInvesment(e.target.value) }} className="form-control b-c" />
                                        <span className="input-group-text">USDT</span>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Stop Gain</span>
                                        <input type="text" value={stopgain} onChange={(e) => { setStopGain(e.target.value) }} className="form-control b-c" />
                                        <span className="input-group-text">%</span>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Stop Loss</span>
                                        <input type="text" value={stoploss} onChange={(e) => { setStopLoss(e.target.value) }} className="form-control b-c" />
                                        <span className="input-group-text">%</span>
                                    </div>


                                    <div className="mt-3 d-flex justify-content-between">
                                        <Button disabled={saving || !balance} onClick={() => { createHybrid() }} variant="success" className="btn btn-block">Start Hybrid</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="card" style={{ height: '100%' }}>
                            <>
                                <TechnicalAnalysis symbol={`${selectedOption?.label || 'BTC'}USDT`} colorTheme="dark" width="100%"></TechnicalAnalysis>
                            </>
                        </div>
                    </div>
                    {/* {!selectedOption && (
                        <div className="col-xl-8 card-select">
                            <div className='card-in col-xl-8'>
                                <img width={60} src={selectIcon} />
                                <h3>Select a Coin to get Technical<br /> Analysis and  AAVEUSDT Chart</h3>
                            </div>
                        </div>

                    )} */}
                </div>
                <div className="col-xl-12">
                    <div className="card" style={{ height: 500, border: '1px solid #181A20' }}>

                        <>
                            <AdvancedRealTimeChart symbol={`${selectedOption?.label || 'BTC'}USDT`} theme="dark" autosize></AdvancedRealTimeChart>
                        </>
                    </div>
                </div>






                {props.type === 'group' && (

                    <div className="col-xl-12">
                        <div className="card card-btn-b-y">
                            <div className="card-header yellow-it">
                                <h4 className="card-title mb-0 yellow-txt">Stop Profit Global</h4>
                            </div>
                            <div className="card-body pt-2" style={{ fontSize: 18 }}>
                                <div className='d-flex justify-content-between p-1 pt-2' >
                                    <h4 className='w-50 card-title'>Current Global Investment:</h4><h4 className='w-50 text-end'><span >{Number(me?.investment).toFixed(2)} USDT</span></h4>  <br />
                                </div>
                                <div className='d-flex justify-content-between p-1 pt-2' style={{ borderTop: '1px solid #2B3139' }}>
                                    <h4 className='w-50 card-title'>Current Global Profit USDT: </h4><h4 className='w-50 text-end'><span style={{ color: Number(me?.profit_usd) > 0 ? 'green' : "#fd5353" }}>{Number(me?.profit_usd).toFixed(2)} USDT</span></h4>  <br />
                                </div>
                                <div className='d-flex justify-content-between p-1 pt-2' style={{ borderTop: '1px solid #2B3139' }}>
                                    <h4 className='w-50 card-title'>Current Global Profit %:</h4><h4 className='w-50 text-end'><span style={{ color: Number(me?.profit) > 0 ? 'green' : "#fd5353" }}>{Number(me?.profit).toFixed(2)} %</span></h4>  <br />
                                </div>

                                <div style={{ borderTop: '1px solid #2B3139', paddingTop: 10 }} className='d-flex justify-content-between align-items-center p-1'>
                                    <h4>Closes At </h4>
                                    <div className='d-flex justify-content-between align-items-center pt-4'>
                                        <input type="text" value={meStopGain} onChange={(e) => { setMeStopGain(e.target.value) }} />
                                        <Button style={{ marginLeft: 20 }} onClick={() => { updateStopGain() }} variant="success" className="btn py-2">Save</Button>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end pt-4'>
                                    <Button onClick={() => { sellAllGroup() }} variant="dark" className="btn yellow-newbtn">Sell all group now</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="col-xl-12">
                    <div className="card">
                        <Tab.Container defaultActiveKey={'Open'}>
                            <div className="card-header border-0 pb-3 flex-wrap pe-0 ps-0">
                                <h4 className="card-title">My Orders</h4>
                                <nav>
                                    <Nav as="div" className="nav-pills light" >
                                        <Nav.Link onClick={() => { getHybridTrades(); fetchMe(); }} as="button" className="yellow-newbtn" eventKey="Open">Refresh</Nav.Link>
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