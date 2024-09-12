import React, { useState } from 'react';
import { Dropdown, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FutureOrderTable from './FutureOrderTable';
import FutureHistory from './FutureHistory';
import FutureTrade from './FutureTrade';
import FutureChart from './FutureChart';
import Select from "react-select";

const orderTable = [
    { color: 'text-success', price: '19972.43', size: '0.0488', total: '6.8312' },
    { color: 'text-danger', price: '20972.43 ', size: '0.0588', total: '5.8312' },
    { color: 'text-success', price: '19972.43', size: '0.0188', total: '7.8310' },
    { color: 'text-danger', price: '19850.20', size: '0.0210', total: '1.0310' },
    { color: 'text-success', price: '20972.43', size: '0.0654', total: '2.3314' },
    { color: 'text-danger', price: '20972.43', size: '0.0123', total: '3.6313' },
    { color: 'text-success', price: '19972.43', size: '0.0147', total: '4.5315' },
    { color: 'text-danger', price: '19850.20', size: '0.0120', total: '2.4316' },
    { color: 'text-danger', price: '20972.43', size: '0.0320', total: '1.3317' },
    { color: 'text-success', price: '19850.20', size: '0.0388', total: '2.1319' },
];


const options = [
    { value: "chocolate", label: "SafeMoon" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

const FutureTrading = () => {

    const [selectedOption, setSelectedOption] = useState(null);
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
                                <span className="text-dark">210.800 USDT</span>
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
                                    <input type="text" className="form-control" />
                                    <span className="input-group-text">%</span>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Stop Loss</span>
                                    <input type="text" className="form-control" />
                                    <span className="input-group-text">%</span>
                                </div>                                


                                <div className="mt-3 d-flex justify-content-between">
                                    <Link to={"#"} className="btn btn-success light btn-block">Start Hybrid</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-xl-8">
                    <div className="card">
                        <Tab.Container defaultActiveKey={'Order'}>
                            <div className="card-header border-0 pb-3 flex-wrap">
                                <h4 className="card-title">Trade Status</h4>
                                <nav>
                                    <Nav as="div" className="nav-pills light" >
                                        <Nav.Link as="button" eventKey="Order">Order</Nav.Link>
                                        <Nav.Link as="button" eventKey="History">Order History</Nav.Link>
                                        <Nav.Link as="button" eventKey="Trade">Trade Histroy</Nav.Link>
                                    </Nav>
                                </nav>
                            </div>
                            <div className="card-body pt-0">
                                <Tab.Content>
                                    <Tab.Pane eventKey="Order">
                                        <FutureOrderTable />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="History">
                                        <FutureHistory />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Trade">
                                        <FutureTrade />
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

export default FutureTrading;