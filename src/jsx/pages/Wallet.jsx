import axiosInstance from "../../services/AxiosInstance";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";

const Wallet = () => {

    const [rows, setRows] = useState([])

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.4 },
        { field: 'name', headerName: 'Name', flex: 0.6 },
        { field: 'email', headerName: 'Email', flex: 0.4 },
        { field: 'referralId', headerName: 'Referral Id', flex: 0.4 },
        { field: 'createdAt', headerName: 'Date Created', flex: 0.4 },
    ]

    return (
        <>
        <div className="row">
        <div className="col-md-4">
                <div style={{border: "2px solid #cea62d", padding: 20, marginBottom: 20, borderRadius: 10}}>
                    <h3>Points Wallet</h3>
                    <h4>Balance: 0 USDT</h4>
                </div>
            </div>
            <div className="col-md-4">
                <div style={{border: "2px solid #cea62d", padding: 20, marginBottom: 20, borderRadius: 10}}>
                    <h3>Transfer Wallet</h3>
                    <h4>Balance: 0 USDT</h4>
                </div>
            </div>
            <div className="col-md-4">
                <div style={{border: "2px solid #cea62d", padding: 20, marginBottom: 20, borderRadius: 10}}>
                    <h3>Earnings Wallet</h3>
                    <h4>Balance: 0 USDT</h4>
                </div>
            </div>
        </div>

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
                                sorting: { sortModel: [{ field: 'id', sort: 'desc' }] },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </div>
                </div>
            </div>
        </>

    );
};

export default Wallet;