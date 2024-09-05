import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../services/AxiosInstance";
import { Badge } from "react-bootstrap";
import './leaders.css'

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
            <div className="row justify-content-around d-flex flex-column align-items-center">
                {leaders && leaders.map((leader, index) => {
                    return (
                        <div key={index} className="col-lg-12">
                            <div className="card some-yellow border-white-leaders">
                                <div className="card-body d-flex flex-row justify-content-between">
                                    <div className="profile-statistics w-100">
                                        <div className="text-center d-flex flex-row justify-content-between align-items-center">
                                            <div className="row">
                                                <div className="col" style={{ marginBottom: 10 }}>
                                                    <h3 style={{ marginBottom: -2 }}>{leader.name}</h3>
                                                    {leader.follows === 1 && (
                                                        <Badge pill bg="primary mt-2">Following</Badge>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col">
                                                <h3 className="m-b-0">{leader.followers}</h3><span><p>Followers</p></span>
                                            </div>
                                            <div className="col">
                                                <h3 className="m-b-0">{leader.totalPositive}</h3> <span><p>Total Positive Operations</p></span>
                                            </div>
                                            <div className="col">
                                                <h3 className="m-b-0">{leader.totalPositivePercent}</h3><span><p>Average Profit</p></span>
                                            </div>

                                            <div>
                                                {leader.follows === 0 && (
                                                    <a onClick={() => { follow(leader.id) }} className="btn mb-1 me-1 follow-it" >Follow</a>
                                                )}
                                                {leader.follows === 1 && (
                                                    <a onClick={() => { unfollow(leader.id) }} className="btn mb-1 me-1 stop-it" >Stop Following</a>
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