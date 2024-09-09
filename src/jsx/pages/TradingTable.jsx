import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DataGrid } from '@mui/x-data-grid';
import './TradingTable.css';
import axiosInstance from '../../services/AxiosInstance';
import { Badge, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const TradingTable = (params) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [tableWidth, setTableWidth] = useState('130%');

    useEffect(() => {
        const hasPendingBuy = params.rows.some((row) => row.mercado && row.estado === 97);
        setTableWidth(hasPendingBuy ? '200%' : '100%');
    }, [params.rows]);

    const verifyBuyNow = async (id) => {
        Swal.fire({
            title: 'Do you want to buy now ?',
            text: "This will cause the bot to buy the coin immediately",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dd6b55',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Yes, buy it now'
        }).then((result) => {
            if (result.isConfirmed) {
                setBuyNow(id)
            }
        })
    }

    const verifySellNow = async (id) => {
        Swal.fire({
            title: 'Do you want to sell now ?',
            text: "This will cause the bot to sell the coin immediately",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dd6b55',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Yes, sell it now'
        }).then((result) => {
            if (result.isConfirmed) {
                sellNow(id)
            }
        })
    }

    const verifyCancel = async (id) => {
        Swal.fire({
            title: 'Do you want to cancel this order ?',
            text: "This will cause the bot to not make the purchase of the coin",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dd6b55',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Yes, cancel it now'
        }).then((result) => {
            if (result.isConfirmed) {
                setCancel(id)
            }
        })
    }

    const openDetails = (row) => {



        Swal.fire({

            title: 'Trade Details',
            html: `
            <div class="text-start">
                <p><strong>ID:</strong> ${row.id}</p>
                <p><strong>Stop Gain:</strong> ${row.stopgain} %</p>
                <p><strong>Stop Loss:</strong> ${row.stoploss} %</p>
                <p><strong>Investment in USDT:</strong> ${row.cost_inicial} USDT</p>
                <p><strong>Buy Price:</strong> ${row.precio_inicial}</p>
                <p><strong>${row.estado === 4 ? 'Sell' : 'Current'} Price:</strong> ${row.precio_final}</p>
                <p><strong>Profit in USDT:</strong> ${row.profit_usd} USDT</p>
            </div>
            `,
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: 'Close',
        })


    }


    const columns = [
        { field: 'id', headerName: 'ID', flex: isMobile ? 1 : 0.4, hide: true, },

        {
            field: 'estado',
            selectable: false,
            headerName: 'Status',
            flex: 0.6,
            renderCell: (params) => {

                if (params.value === 97) {
                    return <Button size='xs' onClick={() => { openDetails(params.row) }} style={{ cursor: "pointer" }} bg="">Pending Buy <i className='fa fa-circle-info' /></Button>
                }

                if ([99, 0].includes(params.value)) {
                    return <Button size='xs' onClick={() => { openDetails(params.row) }} style={{ cursor: "pointer" }} bg="">Buying <i className='fa fa-circle-info' /></Button>
                }

                if ([67].includes(params.value)) {
                    return <Button size='xs' onClick={() => { openDetails(params.row) }} style={{ cursor: "pointer" }} className='btn-new-sell'>Canceled <i className='fa fa-circle-info' /></Button>
                }

                if (params.value === 1) {
                    return <Button size='xs' onClick={() => { openDetails(params.row) }} style={{ cursor: "pointer" }} className='btn-new-operating'>Operating <i className='fa fa-circle-info' /></Button>
                }

                if (params.value === 4) {
                    return <Button size='xs' onClick={() => { openDetails(params.row) }} style={{ cursor: "pointer" }} className='btn-new-complete'>Completed <i className='fa fa-circle-info' /></Button>
                }


                return <></>
            }
        },
        { field: 'coin', headerName: 'Coin', flex: isMobile ? 0.6 : 0.4, },
        {
            field: 'percent', headerName: 'Profit', flex: isMobile ? 0.6 : 0.4,
            cellClassName: (params) => {
                if (params.value < 0) {
                    return 'negative-trade trade';
                }
                if (params.value > 0) {
                    return 'positive-trade trade';
                }
                return 'neutral-trade trade';
            },
            renderCell: (params) => {
                return (

                    <>
                    
                        {params.value} %
                    </>


                )


            }
        },
        {
            field: 'mercado',
            headerName: 'Action',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: isMobile ? 0.7 : 1,
            renderCell: (params) => {
                if (params.row.estado === 97) {
                    return <div>
                        <Button onClick={() => { verifyBuyNow(params.row.id) }} size='xs' variant='info'>Buy Now</Button>
                        <Button onClick={() => { verifyCancel(params.row.id) }} style={{ marginLeft: 10 }} size='xs' variant='danger'>Cancel</Button>
                    </div>
                }
                if (params.row.estado === 1) {
                    return <div>
                        <Button onClick={() => { verifySellNow(params.row.id) }} className='m-1 btn-new-sell' size='xs' >Sell Now</Button>
                    </div>
                }

                if (params.row.sell_now === 1 && params.row.global_profit) {
                    return <div>
                        <Button size='xs' style={{  marginRight: 20 }} className='btn-user-sold'>Global Profit</Button>
                    </div>
                }
                if (params.row.sell_now === 1) {
                    return <div>
                        <Button size='xs' style={{ marginRight: 20 }} className='btn-user-sold'>User Sold</Button>
                    </div>
                }
                return <></>
            }
        },
    ];

    useEffect(() => {
        params.getHybridTrades()
    }, [params.type])



    const setBuyNow = async (id) => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                await axiosInstance.post("/api/robots/setBuyNow", { id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                params.getHybridTrades()
            }
        } catch (error) {
            console.error(error)
        }
    }

    const sellNow = async (id) => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                await axiosInstance.post("/api/robots/sellNow", { id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                params.getHybridTrades()
            }
        } catch (error) {
            console.error(error)
        }
    }

    const setCancel = async (id) => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                await axiosInstance.post("/api/robots/setCancel", { id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                params.getHybridTrades()
            }
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div style={{ width: isMobile ? tableWidth : '100%' }}>
            <DataGrid
                rows={params.rows}
                columns={columns}
                disableRowSelectionOnClick
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            id: false
                        },
                    },
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                    sorting: { sortModel: [{ field: 'id', sort: 'desc' }] },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
};

export default TradingTable;