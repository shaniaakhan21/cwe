import axiosInstance from "../../services/AxiosInstance";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";

const Sales = () => {

    const [rows, setRows] = useState([])


    const fetchUsers = async () => {

        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await axiosInstance.get("/api/user/getAllSales", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setRows(response.data.users)
            }
        } catch (error) {
            // do nothing
            console.log(error)
        }


    }

    useEffect(() => {
        fetchUsers();
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', flex:0.4 },
        { field: 'userId', headerName: 'User ID', flex: 0.6 },
        { field: 'amount', headerName: 'Amount', flex: 0.4 },
        { field: 'createdAt', headerName: 'Date Created', flex: 0.4 },
    ]

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
                            sorting: { sortModel: [{ field: 'id', sort: 'desc' }] },
                        }}
                        pageSizeOptions={[5, 10]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sales;