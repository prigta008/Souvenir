import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { postlist } from '../actions/postActions';
import { userdetaction } from '../actions/userAction';
import { URL } from '../constants';
import { Error, Loading } from './Error';

function UserProf(props) {

    const id = props.match.params.id;

    const user = useSelector(state => state.user);
    const { userInfo } = user;

    const det = useSelector(state => state.userdet);
    const { loading, error, data } = det;

    const [num, setnum] = useState(0);

    const dispatch = useDispatch();
    useEffect(() => { dispatch(userdetaction(id)) }, [dispatch, id]);

    const pos = useSelector(state => state.postlist);
    const { list } = pos;

    useEffect(() => { dispatch(postlist(id)); }, [dispatch, id, num]);

    const followhandler = () => {//sudhar needed
        window.alert(`Done!`);
    }

    const likehandler = async (_id) => {
        var user_id = userInfo._id, username = userInfo.username;
        await axios.put(URL + "/api/posts/put/likes", { _id, user_id, username })
            .then(() => setnum(num + 1))
            .catch((err) => { return });
    }
    useEffect(() => {
      if(list) { for (let i = 0; i < list.length; i++) { document.getElementById(`${i}`).innerHTML = list[i].content }
    }}, [ list]);
    return (
        <div>
            {
                loading ? <Loading></Loading> : error ? <Error>{error}</Error> : data ? (
                    <div className="card box">
                        <div className="card-image">
                            <figure className="image is-4by4">
                                <img src={data.img} alt={data.username} />
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="media">
                                <div className="media-left">
                                    <figure className="image is-48x48">
                                        <img src={data.img} alt={data.username} />
                                    </figure>
                                </div>
                                <div className="media-content">
                                    <p className="title is-4">
                                        {data.username}
                                    </p>
                                </div>
                            </div>
                            <div className="content">
                                <u>About</u> {data.description}<hr />
                                <u>Joined</u> <Moment fromNow>{data.createdAt}</Moment><hr />
                                {
                                    userInfo._id !== data._id
                                        ? (<button onClick={followhandler} className="button is-link"> Follow</button>) : (<></>)
                                }
                                <hr />
                                <div className="card box">
                                    <div className="card-header is-centered">
                                        <div className="card-header-title">Posts</div>
                                    </div>
                                    {
                                        list ? list.length !== 0 ? (
                                            <div>
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
                        </div>
                    </div>
                ) : (<></>)
            }
        </div>
    )
}

export default UserProf;
