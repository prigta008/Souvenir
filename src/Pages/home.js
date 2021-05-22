import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { postfollowing } from '../Redux/postActions';
import { Error, Loading, Post } from '../components/Error';
import { ch } from '../Redux/constants';
import { searchaction } from "../Redux/userAction";
function Home(props) {

    const user = useSelector(state => state.user);
    const { userInfo } = user; const dispatch = useDispatch();
    useEffect(() => { if (!userInfo) { props.history.push("/") } }, [dispatch, userInfo, props.history]);
    // const theme = useSelector(state => state.theme);
    // const { color } = theme;
    const swde = useSelector(state => state.search);
    const { searchres } = swde;
    const [search, setsearch] = useState("");
    const postfoling = useSelector(state => state.folingposts), { loading, response, error } = postfoling;
    const [type, settype] = useState("post");
    const nur = useSelector(state => state.num), { num } = nur;
    useEffect(() => { if (userInfo && userInfo.following !== 0) dispatch(postfollowing(userInfo.following)) }, [dispatch, userInfo, num]);
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
                            <Post allow={false} data={data} id={ch(searchres.indexOf(data))} type="user" />
                        </NavLink>
                        <br />
                    </div>
                    ))}</div>)
                    : <>No results Found</> : <></>}
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
              userInfo.following.length===0
              ? (<Error type="blue">You aren't following Anyone</Error>)
              : loading 
                    ? <Loading/>
                    : error 
                        ? <Error>{error}</Error>
                        :response
                            ? ( response.length===0 
                            ? <Error type="lightblue">Your Followers haven't created any post</Error>
                            : response.map((data)=>(<Post key={data._id} data={data} allow={false}
                                id={ch(response.indexOf(data))} type="post"   />)))
                                 :""
                        }
        </div>
    )
}
export default Home;