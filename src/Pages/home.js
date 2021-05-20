import React, { useEffect, useState } from 'react';
import Moment from "react-moment";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { postlist } from '../Redux/postActions';
import { Error, Loading, Post } from '../components/Error';
import { ch } from '../Redux/constants';
import { searchaction } from "../Redux/userAction";
function Home(props) {

    const user = useSelector(state => state.user);
    const { userInfo } = user;
    const dispatch = useDispatch();
    const postslist = useSelector(state => state.postlist);
   // const theme = useSelector(state => state.theme);
   // const { color } = theme;
    const swde = useSelector(state => state.search);
    const { searchres } = swde;
    const [search, setsearch] = useState("");
    const [type, settype] = useState("post");
    const nur=useSelector(state=>state.num),{num}=nur;
    var { loading, error, list } = postslist;

    if (list === undefined) { list = [] }
    useEffect(() => { if (!userInfo) { props.history.push("/") } }, [dispatch, userInfo, props.history]);
    useEffect(() => { dispatch(postlist(userInfo._id)); }, [dispatch, userInfo, num]);
    const submithandler = () => {
        dispatch(searchaction(type, search));
    }
    return (
        <div id="home">
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
                {searchres ? searchres.length !== 0 ? (<div> Results
                    {  searchres.map((data) => (<div key={data._id}>
                        <NavLink activeClassName="box"
                            to={data.author ? `/posts/${data._id}` : `/userProf/${data._id}`}>
                            <article className="media">
                                <div className="media-left">
                                    <figure className="image is-64x64">
                                        <img alt="dat" src={data.user_img ? data.user_img : data.img} />
                                    </figure>
                                </div>
                                <div className="media-content">
                                    <p>
                                        <b>{data.author ? data.author : data.username}</b>(
                                        <small><Moment fromNow>{data.createdAt}</Moment></small>)
                                        <br />
                                        <b>{data.title ? data.title : data.about}</b>
                                        <br />
                                        <span style={{ "fontFamily": data.font }}>{data.content ? data.content : ""}</span>
                                    </p>
                                </div>
                            </article>
                        </NavLink>
                        <br />
                    </div>
                    ))}</div>)
                    : <>No results Found</> : <></>
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
                loading ? <Loading></Loading> : error ? <Error type="red">{error}</Error> : list.length === 0
                    ? (<span>No Posts! <NavLink to="/add">Create A New One</NavLink> </span>)
                    :list.map((data) => (  <Post data={data} allow={false}
                        key={data._id} id={ch(list.indexOf(data))} />))
            }
        </div>
    )
}
export default Home;