import { Button } from "react-bootstrap";
import axiosInstance from "../../services/AxiosInstance";
import { useState } from "react";

const Upgrade = () => {

    const [sending, setSending] = useState(false);

    const Upgrade = async () =>{
        setSending(true)
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await axiosInstance.post("/api/user/upgrade", {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error(error)
            
        setSending(false)
        }
    }

    return (
        <div className="text-center">
           <div className="col-md-6 col-xs-12 mx-auto" style={{border: "1px solid grey", padding: 20}}> 
            <h3>CWEBuster PRO</h3>
            <div style={{backgroundColor: 'black', width: 200, marginLeft: "auto", marginRight: "auto", color: "white", marginBottom: 20, fontSize: 28}}>100 $</div>
            <ul>
                <li>Trade up to 100k Monthly</li>
                <li>Trade any coin</li>
            </ul>

            <Button disabled={sending} onClick={() => {Upgrade()}} className="me-2" variant="success" style={{marginTop: 20}}>
                    Buy Now
            </Button>
           </div>
        </div>
    );
};

export default Upgrade;