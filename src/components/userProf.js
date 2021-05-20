import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postlist } from '../Redux/postActions';
import { signin, userdetaction } from '../Redux/userAction';
import { URL } from '../Redux/constants';
import { Error, Loading } from './Error';
import { Profile } from './formele';

function UserProf(props) {

    const id = props.match.params.id;

    const user = useSelector(state => state.user);
    const { userInfo } = user;

    const det = useSelector(state => state.userdet);
    const { loading, error, data } = det;

    const [num, setnum] = useState(0);
    const [num2, setnum2] = useState(0);

    const dispatch = useDispatch();
    useEffect(() => { dispatch(userdetaction(id)) }, [dispatch, id, num2]);

    const pos = useSelector(state => state.postlist);
    var { list } = pos;
    if (list === undefined) { list = [] }
    useEffect(() => { dispatch(postlist(id)); }, [dispatch, id, num]);
    useEffect(() => {
        for (let i = 0; i < list.length; i++) {
            document.getElementById(`${i}`).innerHTML = list[i].content
        }
    }, [list]);

    const followhandler = async () => {
        var subject = userInfo._id, object = id;
        await axios.put(URL + "/api/user/put/follow", { subject, object })
            .then(() => {
                signin("", "", userInfo._id);
                setnum2(num2 + 1); var t = "";
                const bool = () => { for (let i = 0; i < data.followers.length; i++) { if (data.followers[i].id === userInfo._id) { return true } } }
                if (bool()) { t = "Unfollow" }
                else { t = "Follow" }
                document.getElementById("follow").innerHTML = t
            })
            .catch((err) => { return; });
    }

    const likehandler = async (_id) => {
        var user_id = userInfo._id, username = userInfo.username;
        await axios.put(URL + "/api/posts/put/likes", { _id, user_id, username })
            .then(() => setnum(num + 1))
            .catch((err) => { return });
    }
    return (
        <div>
            {  loading ? <Loading></Loading> : error ? <Error>{error}</Error> : data ? (
                <div>
                    <Profile img={data.img} username={data.username} allow={false}
                        description={data.description} email={data.email}
                        createdAt={data.createdAt} followers={data.followers} />
                    {
                        userInfo._id !== data._id
                            ? (<button onClick={followhandler} id="follow" className="button is-link"> Follow</button>) : (<></>)
                    }
                    <hr />
                    <div className="card box is-fullwidth">
                        <div className="card-header is-centered">
                            <div className="card-header-title is-centered">Posts</div>
                        </div>
                        {list ? list.length !== 0 ? (<div>
                            {list.map((data) => (<div key={data._id}>
                                <div className="card-header is-centered">
                                    <div className="card-header-title is-centered">
                                        {data.title}
                                    </div>
                                </div>
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-left">
                                            <figure className="image is-48x48">
                                                <img src={data.user_img} alt="prof" />
                                            </figure>
                                        </div>
                                        <div className="media-content">
                                            <p className="title is-4">
                                                {data.author}
                                            </p>
                                        </div>
                                    </div>
                                    <div id={list.indexOf(data)} className="content">
                                        {data.content}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <nav className="tabs">
                                        <ul>
                                            <li>
                                                <i className='fas fa-reply'></i>Reply
                                                                    </li>
                                            <li>
                                                <i className="fas fa-retweet"></i>Comment
                                                                   </li>
                                            <li onClick={() => likehandler(data._id)}>
                                                <i className="fas fa-heart"></i>Like
                                                                </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>))}
                        </div>
                        ) : (<p>No Posts Created</p>) : (<p>No Posts Created</p>)
                        }
                    </div>
                </div>
            ) : (<></>)}
        </div>
    )
}

export default UserProf;
