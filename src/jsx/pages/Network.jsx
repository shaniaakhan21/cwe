import { Button } from "react-bootstrap";
import axiosInstance from "../../services/AxiosInstance";
import { useEffect, useState } from "react";
import OrganizationChart from '@dabeng/react-orgchart'

import './Network.css'

const Network = () => {
    const [key, setKey] = useState(0)
    const [tree, setTree] = useState({})

    const refreshComponent = () => {
        setKey(prevKey => prevKey + 1) // incrementing key will cause the component to be recreated
    }

    
    const getTree = async () =>{
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await axiosInstance.get("/api/user/getTree", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return setTree(response.data.tree)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getTree()
    }, [])


    return (
        <div>
            <OrganizationChart
                key={key}
                datasource={tree}
                pan={true}
                collapsible={false}
            />
        </div>
    );
};

export default Network;