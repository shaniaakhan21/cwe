import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../services/AxiosInstance";
import { Badge } from "react-bootstrap";

const Leaders = () => {
    const [leaders, setLeaders] = useState([]);

    const getAllLeaders = async () => {

        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await axiosInstance.get("/api/user/getAllLeaders", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setLeaders(response.data.leaders)
            }
        } catch (error) {
            // do nothing
            console.log(error)
        }


    }

    useEffect(() => {
        getAllLeaders();
    }, [])
    

    const follow = async (idLeader) => {

        try {
            const token = localStorage.getItem('token')
            if (token) {
                await axiosInstance.post("/api/user/follow", {
                    idLeader
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                getAllLeaders()
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    
    const unfollow = async (idLeader) => {

        try {
            const token = localStorage.getItem('token')
            if (token) {
                await axiosInstance.post("/api/user/unfollow", {
                    idLeader
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                getAllLeaders()
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="row">
                {leaders && leaders.map((leader, index) => {
                    return (
                        <div key={index} className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="profile-statistics">
                                        <div className="text-center">
                                            <div className="row">
                                                <div className="col" style={{marginBottom: 10}}>
                                                    <h3 style={{marginBottom: -2}}>{leader.name}</h3>  
                                                    {leader.follows === 1 && (  
                                                        <Badge pill  bg="primary">Following</Badge>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <h3 className="m-b-0">{leader.followers}</h3><span>Followers</span>
                                                </div>
                                                <div className="col">
                                                    <h3 className="m-b-0">{leader.totalPositive}</h3> <span>Total Positive Operations</span>
                                                </div>
                                                <div className="col">
                                                    <h3 className="m-b-0">{leader.totalPositivePercent}</h3> <span>Average Profit</span>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                {leader.follows === 0 && (
                                                    <a onClick={() =>  { follow(leader.id)}} className="btn btn-primary mb-1 me-1" >Follow</a>
                                                )}
                                                {leader.follows === 1 && (
                                                    <a onClick={() =>  { unfollow(leader.id)}} className="btn btn-info mb-1 me-1" >Stop Following</a>
                                                )}
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </>
    );
};

export default Leaders;