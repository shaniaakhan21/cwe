import { useEffect, useState } from 'react';
import { Button, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Select from "react-select";
import FutureOrderTable from './trading/FutureOrderTable';
import FutureHistory from './trading/FutureHistory';
import FutureTrade from './trading/FutureTrade';
import axiosInstance from '../../services/AxiosInstance';


const Trading = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [stopgain, setStopGain] = useState(3);
    const [stoploss, setStopLoss] = useState(99);
    const [balance, setBalance] = useState(undefined);


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

    console.log(balance)

    return (
        <>
            <div className="row">

                <div className="col-xl-4">
                    <div className="card">
                        <div className="card-header border-0 pb-0">
                            <h4 className="card-title mb-0">New Hybrid</h4>
                        </div>
                        <div className="card-body pt-2">
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
                                        defaultValue={selectedOption}
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
                                    <input type="text" className="form-control" />
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
                                    <Button variant="success" className="btn btn-sm  text-uppercase  btn-block">Start Hybrid</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-xl-8">
                    <div className="card">
                        <Tab.Container defaultActiveKey={'Open'}>
                            <div className="card-header border-0 pb-3 flex-wrap">
                                <h4 className="card-title">My Orders</h4>
                                <nav>
                                    <Nav as="div" className="nav-pills light" >
                                        <Nav.Link as="button" eventKey="Open">Open</Nav.Link>
                                        <Nav.Link as="button" eventKey="Closed">Closed</Nav.Link>
                                    </Nav>
                                </nav>
                            </div>
                            <div className="card-body pt-0">
                                <Tab.Content>
                                    <Tab.Pane eventKey="Open">
                                        <FutureOrderTable />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Closed">
                                        <FutureHistory />
                                    </Tab.Pane>
                                </Tab.Content>
                            </div>
                        </Tab.Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Trading;