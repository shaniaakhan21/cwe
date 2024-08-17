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
                    { headers: {
                        Authorization: `Bearer ${token}`,
                    } },
                );
                await fetchTimeline();
            }
        } catch (error) {
            // do nothing
            console.log(error)
        }

    }


    return (
        <div className="my-post-content pt-3">
            <div className="post-input">
                <textarea name="textarea" value={post} onChange={(e) => setPost(e.target.value)} id="textarea" cols={30} rows={5} className="form-control bg-transparent" placeholder="Please type what you want...." defaultValue={""} />
                <Link to={"#"} className="btn btn-primary ms-1" onClick={() => createTimeline()}>Post</Link>
            </div>

            {timeline.map((post, index) => {
            const metadata = JSON.parse(post.metadata)
            return  (
            <div key={index} className="profile-uoloaded-post border-bottom-1 pb-5">
                <Link className="post-title" to="/post-details">
                    <h3 >{post.name}</h3>
                    <h5 >{post.message}</h5>
                </Link>
                <p>
                    {post.createdAt.split('T')[0]}  {post.createdAt.split('T')[1].split('.')[0]}
                </p>
                {post?.type === 1 && (
                <Link className="btn btn-primary me-2" to={`/trading/${metadata?.mercado ||''}`} >

                        <>
                            <span className="me-2"> <i className="fa fa-share" /> </span>Replicate Order
                        </>
                   
                    
                </Link>
                )}
            </div>
            )})}
        </div>
    )
}


export default Feed;