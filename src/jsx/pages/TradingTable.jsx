import { useEffect } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import './TradingTable.css';
import axiosInstance from '../../services/AxiosInstance';
import { Badge, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const TradingTable = (params) => {


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



    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.4, hide: true, },
    
        {
            field: 'estado',
            selectable: false,
            headerName: 'Status',
            flex: 0.6,
            renderCell: (params) => {
    
                if (params.value === 97) {
                    return <Badge style={{ cursor: "pointer", backgroundColor: '#e79e01' }} bg="">Pending Buy <i className='fa fa-circle-info' /></Badge>
                }

                if ([99,0].includes(params.value)) {
                    return <Badge style={{ cursor: "pointer", backgroundColor: '#e79e01' }} bg="">Buying <i className='fa fa-circle-info' /></Badge>
                }

                if ([67].includes(params.value)) {
                    return <Badge style={{ cursor: "pointer" }} bg="danger">Canceled <i className='fa fa-circle-info' /></Badge>
                }

                if (params.value === 1) {
                    return <Badge style={{ cursor: "pointer"}} bg="info">Operating <i className='fa fa-circle-info' /></Badge>
                }

                if (params.value === 4) {
                    return <Badge style={{ cursor: "pointer", backgroundColor: 'green' }} bg="">Completed <i className='fa fa-circle-info' /></Badge>
                }
                
    
                return <></>
            }
        },
        { field: 'coin', headerName: 'Coin', flex: 0.4, },
        {
            field: 'percent', headerName: 'Profit', flex: 0.5,
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
                return `${params.value} %`
            }
        },
        {
            field: 'mercado',
            headerName: 'Action',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: 1,
            renderCell: (params) => {
                if (params.row.estado === 97) {
                    return <div>
                        <Button onClick={() => {verifyBuyNow(params.row.id)}} size='xs' variant='info'>Buy Now</Button>
                        <Button onClick={() => {verifyCancel(params.row.id)}} style={{ marginLeft: 10 }} size='xs' variant='danger'>Cancel</Button>
                    </div>
                }
                if (params.row.estado === 1) {
                    return <div>
                        <Button onClick={() => {verifySellNow(params.row.id)}} style={{ marginLeft: 10 }} size='xs' variant='danger'>Sell Now</Button>
                    </div>
                }                
                return <></>
            }
        },
    ];

    useEffect(() => {
        params.getHybridTrades()
    }, [])



    const setBuyNow = async (id) => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                await axiosInstance.post("/api/robots/setBuyNow", {id},
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
                await axiosInstance.post("/api/robots/sellNow", {id},
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
                await axiosInstance.post("/api/robots/setCancel", {id},
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
        <div style={{ width: '100%' }}>
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