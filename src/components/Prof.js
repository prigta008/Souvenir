import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { postdet } from '../Redux/postActions';
import { URL } from '../Redux/constants';
import { Error, Loading } from './Error';

function Prof(props) {

    const id = props.match.params.id;
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const { userInfo } = user;

    const det = useSelector((state) => state.det);
    const { loading, error, data } = det;

    const [num, setnum] = useState(0);

    useEffect(() => { dispatch(postdet(id)) }, [dispatch, id, num]);

    useEffect(() => { if (data) document.getElementById("c").innerHTML = data.content.replaceAll("\n", "<br/>") }, [data])

    const likehandler = async () => {
        var user_id = userInfo._id, _id = id, username = userInfo.username;
        await axios.put(URL + "/api/posts/put/likes", { _id, user_id, username })
            .then(() => setnum(num + 1))
            .catch((err) => { return });
    }

    return (
        <div>
            {
                loading ? (<Loading></Loading>) : error ? (<Error type="red">{error}</Error>) : data ?
                    <div className="card box">
                        <div className="card-header is-centered">
                            <div className="card-header-title is-centered">
                                {data.title}
                            </div>
                        </div>
                        <div className="card-content">
                            <div className="media">
                                <div className="media-left">
                                    <figure className="image is-48x48">
                                       
                                    </figure>
                                </div>
                                <div className="media-content">
                                    <p className="title is-4">
                                        {data.author} (<Moment fromNow>{data.createdAt}</Moment>)
                            </p>
                                </div>
                            </div>
                            <div style={{ "fontFamily": data.font }} id="c">
                                {data.content}
                            </div>
                        </div>
                        <div className="card-footer is-fullwidth">
                            <nav className="tabs is-fullwidth">
                                <ul>
                                    <li>
                                        <i className='fas fa-reply'></i>Reply
                                      </li>
                                    <li>
                                        <i className="fas fa-retweet"></i>Comment
                                     </li>
                                    <li onClick={likehandler}>
                                        <i className="fas fa-heart"></i>Like ({data.likers.length})
                                     </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    : (<></>)
            }
        </div>)
}

export default Prof;