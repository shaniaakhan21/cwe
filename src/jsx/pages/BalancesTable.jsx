/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axiosInstance from '../../services/AxiosInstance';
import * as XLSX from 'xlsx';
import { Button, useMediaQuery, Fab } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const BalancesTable = (props) => {

    const [balances, setBalances] = useState(undefined);
    const isMobile = useMediaQuery('(max-width:600px)');

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


    const columns = [
        { field: 'name', headerName: 'Name', flex: isMobile ? 1.2 : 1 },
        { field: 'balance', headerName: 'Balance', flex: isMobile ? 1.5 : 1 },
        { field: 'price', headerName: 'Price', flex: isMobile ? 1.2 : 1 },
        { field: 'total', headerName: 'Total in USDT', flex: isMobile ? 1.6 : 1 },
        !isMobile && {
            field: 'download',
            headerName: '', 
            flex: 0.4,
            sortable: false, 
            renderHeader: () => (
                <Button
                    color="primary"
                    className="save-chn"
                    onClick={handleDownload}
                >
                    Download
                </Button>
            ),
            renderCell: () => null, 
        },
    ].filter(Boolean);

    // Conditional check for balances being undefined or empty
    const rows = balances && balances.length > 0
        ? balances.map((balance, index) => ({
            id: index + 1,
            name: balance.name,
            balance: balance.balance,
            price: balance.price,
            total: balance.total,
        }))
        : [];

    // Function to handle Excel download
    const handleDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Balances');

        const date = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
        const fileName = `balances-report-${date}.xlsx`;

        XLSX.writeFile(workbook, fileName);
    };

    if (balances === undefined) {
        return <div style={{ textAlign: "center", marginTop: 50 }}>
            <div className="spinner-border" style={{ width: "8rem", height: "8rem" }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    console.log('balances', balances)


    return (
        <div className="col-xl-12">
            <div className="card">
                <div style={{ width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        disableRowSelectionOnClick
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                            sorting: { sortModel: [{ field: 'name', sort: 'asc' }] },
                        }}
                        pageSizeOptions={[5, 10, 20]}
                    />
                </div>
            </div>

            {isMobile && (
                <Fab 
                    color="primary" 
                    className='download-fab'
                    aria-label="download" 
                    onClick={handleDownload} 
                    style={{ position: 'fixed', bottom: '20px', right: '20px' }}
                >
                    <DownloadIcon />
                </Fab>
            )}
        </div>
    );
};

export default BalancesTable;