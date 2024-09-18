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
           <div className="col-md-6 col-xs-12 mx-auto border-yellow-01"> 
            <h3>CWE Buster PRO</h3>
            <div style={{backgroundColor: '#2B3139', borderRadius: 3, width: 200, marginLeft: "auto", marginRight: "auto", color: "#EAECEF", marginBottom: 20, fontSize: 28}}>100 $</div>
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