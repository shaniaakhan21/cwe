/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../services/AxiosInstance';

const theadData = [
    { heading: 'Name'},
    { heading: 'Balance' },
    { heading: 'Price' },
    { heading: 'Total in USDT' },
];

const BalancesTable = (props) => {

    const [balances, setBalances] = useState(undefined);

    const getBalances = async () => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await axiosInstance.get("/api/robots/getBalances", {
                    params: {
                        idPlataforma: props.idPlataforma.split('-')[1]
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return setBalances(response.data.balances)
            }
        } catch (error) {
            console.error(error)
        }
        return setBalances(null)
    }

    useEffect(() => {
        getBalances()
    }, [])




    const sort = 8;
    const [data, setData] = useState(
        document.querySelectorAll('#example6_wrapper tbody tr')
    )

    const activePag = useRef(0)
    const [test, settest] = useState(0)

    const chageData = (frist, sec) => {
        for (var i = 0; i < data.length; ++i) {
            if (i >= frist && i < sec) {
                data[i].classList.remove('d-none')
            } else {
                data[i].classList.add('d-none')
            }
        }
    }
    useEffect(() => {
        setData(document.querySelectorAll('#example6_wrapper tbody tr'))
    }, [test, balances])

    activePag.current === 0 && chageData(0, sort)

    let paggination = Array(Math.ceil(data.length / sort))
        .fill()
        .map((_, i) => i + 1)

    const onClick = (i) => {
        activePag.current = i
        chageData(activePag.current * sort, (activePag.current + 1) * sort)
        settest(i)
    }


    if (balances === undefined) {
        return <div style={{ textAlign: "center", marginTop: 50 }}>
            <div className="spinner-border" style={{ width: "8rem", height: "8rem" }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    console.log('balances',balances)
    


    return (
        <div className="table-responsive dataTabletrade">
            <div id='example6_wrapper' className='dataTables_wrapper no-footer'>
                <table id="example-history" className="table shadow-hover display  orderbookTable dataTable no-footer" style={{ minWidth: "845px" }}>
                    <thead>
                        <tr>
                            {theadData.map((item, ind) => (
                                <th key={ind} >
                                    {item.heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {balances.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    <Link to={"#"} className="market-title d-flex align-items-center">
                                        <div className={`market-icon bg-${item.name === "Dash" ? 'success' : 'warning'} `} >
                                            {item.logo}
                                        </div>
                                        <h5 className="mb-0 ms-2">{item.name}</h5>
                                        <span className="text-muted ms-2">{item.subtitle}</span>
                                    </Link>
                                </td>
                                <td>{item.balance}</td>
                                <td>{item.price}</td>
                                <td>{item.total}</td>
                                </tr>
                        ))}
                    </tbody>
                </table>
                <div className='mt-3 d-flex justify-content-between align-items-center'>
                    <div className='dataTables_info'>
                        Showing {activePag.current * sort + 1} to{' '}
                        {data.length > (activePag.current + 1) * sort
                            ? (activePag.current + 1) * sort
                            : data.length}{' '}
                        of {data.length} entries
                    </div>
                    <div
                        className='dataTables_paginate paging_simple_numbers'
                        id='example-history_paginate'
                    >
                        <Link
                            className='paginate_button text-center previous disabled'
                            to='#'
                            onClick={() =>
                                activePag.current > 0 && onClick(activePag.current - 1)
                            }
                        >
                            <i className='fa fa-angle-double-left' />
                        </Link>
                        <span>
                            {paggination.map((number, i) => (
                                <Link
                                    key={i}
                                    to='#'
                                    className={`paginate_button  ${activePag.current === i ? 'current' : ''
                                        } `}
                                    onClick={() => onClick(i)}
                                >
                                    {number}
                                </Link>
                            ))}
                        </span>
                        <Link
                            className='paginate_button next text-center'
                            to='#'
                            onClick={() =>
                                activePag.current + 1 < paggination.length &&
                                onClick(activePag.current + 1)
                            }
                        >
                            <i className='fa fa-angle-double-right' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BalancesTable;