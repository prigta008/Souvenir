import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postfollowing } from '../Redux/postActions';
import { Error, Loading, Post } from '../components/Error';
import { ch } from '../Redux/constants';
import { searchaction, selfReloadUserDetails } from "../Redux/userAction";
function Home(props) {

    const user = useSelector(state => state.user);
    const { userInfo } = user; const dispatch = useDispatch();
    useEffect(() => { if (!userInfo) { props.history.push("/") } }, [dispatch, userInfo, props.history]);
    const swde = useSelector(state => state.search), { searchres } = swde;
    const [search, setsearch] = useState("");
    const postfoling = useSelector(state => state.folingposts), { loading, response, error } = postfoling;
    const [type, settype] = useState("post");
    useEffect(()=>{dispatch(selfReloadUserDetails(userInfo._id))},[dispatch,userInfo._id]);
    useEffect(() => { if (userInfo && userInfo.following.length !== 0) dispatch(postfollowing(userInfo.following)) }, [dispatch, userInfo]);
    const submithandler = () => {
        dispatch(searchaction(type, search));
    }
    
    return (
        <div id="home">
           <div className="field has-addons has-addons-centered mt-2">
               <p className="control">
               <span className="select">
                <select onChange={(e)=>settype(e.target.value)} value={type}>
                  <option key="0" id="opt1" value="post">Post</option>
                  <option key="2" id="opt2" value="user">User</option>
                </select>
                </span>
               </p>
               <p className="control is-expanded">
                   <input value={search} onChange={(e)=>setsearch(e.target.value)} className="input" type="text" placeholder="Search Post And User"/>
                 </p>
               <p className="control">
                 <button onClick={submithandler} className="button is-link">
                    Search
                 </button>
                 </p>
           </div>
            <div>
                {searchres ? searchres.length !== 0 ? (<div> Results
                    {  searchres.map((data) => (<div key={data._id}>
                            <Post hasToDo={true} src="" allow={false} data={data} id={ch(searchres.indexOf(data))} type="user" />
                    </div>
                    ))}</div>)
                    : <>No Results Found</> : <></>}
            </div>
            <div className="box mb-2 is-centered">Posts</div>
           {
              userInfo.following.length===0
              ? (<Error type="blue">You aren't following Anyone</Error>)
              : loading 
                    ? <Loading/>
                    : error 
                        ? <Error type="blue">{error}</Error>
                        :response
                            ? ( response.length===0 
                            ? <Error type="lightblue">Your Followers haven't created any post</Error>
                            : response.map((data)=>(
                                <Post data={data} allow={false} key={data._id}
                                id={ch(response.indexOf(data))} type="post" hasToDo={true} src=""/>)))
                                 :""
                        }
        </div>
    )
}
export default Home;