import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { NavLink } from "react-router-dom";
import { Loading, Error } from './Error'; 
import { postlist } from '../actions/postActions';
import Swal from 'sweetalert2';
import axios from 'axios';
import { URL } from '../constants';


function User(props) {
    const user = useSelector(state => state.user);
    const { userInfo } = user;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!userInfo) { props.history.push("/"); }
    }, [userInfo, dispatch, props.history]);

    const theme = useSelector(state => state.theme);
    const { color } = theme;
    const postslist = useSelector(state => state.postlist);
    var { loading, error, list } = postslist;
    if (list === undefined) { list = [] };

    const [num, setnum] = useState(0);
    useEffect(() => { dispatch(postlist(userInfo._id)); }, [dispatch, userInfo, num]);
    useEffect(() => {
        for (let i = 0; i < list.length; i++) {
            document.getElementById(`${i}`).innerHTML = list[i].content
        }
    }, [list.length, list]);
    const deletehandler = (id) => {
        Swal.fire({
            title: "Confirmation", icon: "warning",
            html: "Are You Sure To Delete this Post", showDenyButton: true,
            confirmButtonText: "Yes, I'm Sure", denyButtonText: "No",
            denyButtonColor: "#2778c4", confirmButtonColor: "red"
        })
            .then(async (res) => {
                if (res.isConfirmed) {
                    await axios.delete(URL + `/api/posts/delete/post/${id}`)
                        .then(() => { Swal.fire({ icon: "success", html: "Deleted Succesfully" }).then(setnum(num + 1)) })
                        .catch((err) => { Swal.fire({ icon: "error", html: err }) })
                }
                else {
                    return;
                }
            })
    }
    return (
        <div id="user" style={color}>
            <NavLink style={{ "position": "fixed", "right": "15px" }} to="/edit" id="write" >
                <i className="fas fa-pen-alt"></i>
            </NavLink>
            <div className="card box">
                <div className="card-image">
                    <figure className="image is-4by4">
                        <img src={userInfo.img} alt="profile" />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img src={userInfo.img} alt="profile" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4">
                                {userInfo.username}
                            </p>
                        </div>
                    </div>
                    <div className="content">
                        <u> About</u>   {userInfo.description}<hr />
                        <u>Email</u>   {userInfo.email} <hr />
                        <u>Joined</u>   <Moment fromNow>{userInfo.createdAt}</Moment>
                    </div>
                </div>
            </div>

            <div id="posts">
                My Posts <hr />
                {
                    loading ? <Loading> </Loading> :
                        error ? <Error type="red">{error}</Error> :
                            <div>
                                {
                                    list.length === 0
                                        ? (
                                            <div>
                                                No Posts ! <NavLink to="/add"> Create A New One </NavLink><br /><br /><br />
                                            </div>
                                        )
                                        : (
                                            <div>
                                                { list.map((data) => (
                                                    <div key={data._id}>
                                                        <div className="box">
                                                            <article className="media">
                                                                <div className="media-left">
                                                                    <figure className="image is-64x64">
                                                                        <img alt="dat" src={data.user_img} />
                                                                    </figure>
                                                                </div>
                                                                <div className="media-content">
                                                                    <p>
                                                                        <b>{data.author}</b>
                                                                        <small><Moment fromNow>{data.createdAt}</Moment></small>
                                                                        <br />
                                                                        <b>{data.title}</b>
                                                                        <br />
                                                                        <span style={{ "fontFamily": data.font }} id={list.indexOf(data)}></span>
                                                                    </p>
                                                                </div>
                                                                <nav className="level is-mobile">
                                                                    <div className="level-left">
                                                                        <span className="level-item">
                                                                            <span className="icon is-small">
                                                                                <i className="fas fa-reply"></i>
                                                                            </span>
                                                                        </span>

                                                                        <span className="level-item">
                                                                            <span className="icon is-small">
                                                                                <i className="fas fa-retweet"></i>
                                                                            </span>
                                                                        </span>

                                                                        <span className="level-item">
                                                                            <span className="icon is-small">
                                                                                <i className="fas fa-heart"></i>
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                </nav>
                                                            </article>
                                                            <button className="button is-danger" onClick={() => deletehandler(data._id)}>Delete</button>
                                                        </div>
                                                        <br />
                                                    </div>
                                                )
                                                )}
                                            </div>)
                                }
                            </div>
                }
            </div>
        </div>
    )
}
export default User;