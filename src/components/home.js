import React, { useEffect, useState } from 'react';
import Moment from "react-moment";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { postlist } from '../actions/postActions';
import { Error, Loading } from './Error';
import axios from "axios";
import { URL } from '../constants';
import {searchaction} from "../actions/userAction";
function Home(props) {

    const user = useSelector(state => state.user);
    const { userInfo } = user;
    const dispatch = useDispatch();
    const postslist = useSelector(state => state.postlist);
    const theme = useSelector(state => state.theme);
    const { color } = theme;
    const swde = useSelector(state=>state.search);
    const {searchres} = swde;
    const [search, setsearch] = useState("");
    const [type, settype] = useState("post");
    const [num, setnum] = useState(0);
    var { loading, error, list } = postslist;

    if (list === undefined) { list = [] }
    useEffect(() => { if (!userInfo) { props.history.push("/") } }, [dispatch, userInfo, props.history]);
    useEffect(() => { dispatch(postlist(userInfo._id)); }, [dispatch, userInfo, num]);
    useEffect(() => {
        for (let i = 0; i < list.length; i++) { document.getElementById(`${i}`).innerHTML = list[i].content }
    }, [list.length, list]);

    const likehandler = async (_id, user_id, username,) => {
        await axios.put(URL + "/api/posts/put/likes", { _id, user_id, username })
            .then(() => setnum(num + 1))
            .catch((err) => { return });
    }
    const submithandler = ()=>{
        dispatch(searchaction(type,search));
    }
    return (
        <div id="home" style={color}>
            <br />
            <div className="field">
                    <div className="control">
                        <div className="select">
                            <select className="control" value={type} onChange={(e) => settype(e.target.value)}>
                                <option value="post" key="0">Posts</option>
                                <option value="user" key="1">Users</option>
                            </select>
                        </div>
                    </div>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input required={true} type="search"
                             value={search} onChange={(e) => setsearch(e.target.value)}
                              placeholder="Search Posts & Users..." className="input is-primary is-rounded" />
                        </div>
                        <div className="control">
                            <button onClick={submithandler} className="button is-link is-rounded">Search</button>
                        </div>
                    </div>
            </div>
            <div>
                {
                    searchres? searchres.length!==0 ?(
                    <div> Results
                       {  searchres.map((data)=>(
                        <div key={data._id}>
                        <NavLink activeClassName="box" 
                        to={data.author ? `/posts/${data._id}`:`/userProf/${data._id}`}>
                            <article className="media">
                                <div className="media-left">
                                    <figure className="image is-64x64">
                                        <img alt="dat" src={data.user_img? data.user_img:data.img} />
                                    </figure>
                                </div>
                                <div className="media-content">
                                    <p>
                                        <b>{data.author?data.author:data.username}</b>(
                                        <small><Moment fromNow>{data.createdAt}</Moment></small>)
                                        <br />
                                        <b>{data.title? data.title:data.about}</b>
                                        <br />
                                        <span style={{ "fontFamily": data.font }} id={searchres.indexOf(data)}>{data.content?data.content:""}</span>
                                    </p>
                                </div>
                                  </article>
                        </NavLink>
                        <br />
                    </div>    
                    ))}</div>)
                    : <>No results Found</>:<></>
                                }
            </div>



            <div className="card">
                <div className="card-header is-centered">
                    <h3 className="card-header-title is-centered">
                        Posts
                        </h3>
                </div>
            </div>
            <hr />
            {
                loading
                    ? <Loading></Loading>
                    : error
                        ? <Error type="red">{error}</Error>
                        : list.length === 0
                            ? (<span>No Posts! <NavLink to="/add">Create A New One</NavLink> </span>)
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
                                                            <b>{data.author}</b>(
                                                            <small><Moment fromNow>{data.createdAt}</Moment></small>)
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
                                                                <span onClick={() => likehandler(data._id, data.user_id, data.author)} className="icon is-small">
                                                                    <i className="fas fa-heart"></i>{data.likers.length}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </nav>
                                                </article>
                                            </div>
                                            <br />
                                        </div>
                                    )
                                    )} </div>)
            }
        </div>
    )
}
export default Home;