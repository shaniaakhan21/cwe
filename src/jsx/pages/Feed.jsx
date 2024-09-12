import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axiosInstance from "../../services/AxiosInstance"

export const Feed = () => {

    const [timeline, setTimeline] = useState([])
    const [post, setPost] = useState('');


    const fetchTimeline = async () => {

        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await axiosInstance.get("/api/robots/getTimeLine", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setTimeline(response.data.timeline)
            }
        } catch (error) {
            // do nothing
            console.log(error)
        }


    }

    useEffect(() => {
        fetchTimeline();
    }, [])


    const createTimeline = async () => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                await axiosInstance.post("/api/robots/createTimeline", {
                    message: post
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    },
                );
                await fetchTimeline();
            }
        } catch (error) {
            // do nothing
            console.log(error)
        }

    }


    return (
        <div className="my-post-content">
            <div className="post-input">
                <textarea name="textarea" value={post} onChange={(e) => setPost(e.target.value)} id="textarea" cols={30} rows={5} className="form-control bg-transparent border-yellow-02" placeholder="Please type what you want...." defaultValue={""} />
                <Link to={"#"} className="btn btn-primary ms-1" onClick={() => createTimeline()}>Post</Link>
            </div>

            {timeline.map((post, index) => {
                const metadata = JSON.parse(post.metadata)
                return (
                    <div key={index} className="profile-uoloaded-post border-bottom-1 mb-5 p-4  border-post">
                        <div>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <Link className="post-title" to="/post-details">
                                    <h3 >{post.name}</h3>
                                </Link>
                                {post?.type === 1 && (
                                    <Link className="btn btn-primary me-2" to={`/single-trading/${metadata?.mercado || ''}`} >

                                        <>
                                            <span className="me-2"> <i className="fa fa-share" /> </span>Replicate Order
                                        </>

                                    </Link>
                                )}
                            </div>
                            <div className="d-flex aligh-items-center my-3 p-2 border-green-feed">
                                <Link className="post-title w-50 text-capitalize" to="/post-details">
                                    <p className="mb-0">{post.message}</p>
                                </Link>

                                <p className="w-50 text-end mb-0">
                                    {post.createdAt.split('T')[0]}  {post.createdAt.split('T')[1].split('.')[0]}
                                </p>
                            </div>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}


export default Feed;