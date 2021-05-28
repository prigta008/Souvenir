import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Loading, Error, Post } from '../components/Error';
import { postlist } from '../Redux/postActions';
import { Followers, Profile } from '../components/formele';
import { ch } from '../Redux/constants';
import { OfflinePost } from '../components/off';

function User(props) {

    const user = useSelector(state => state.user), { userInfo } = user;
    const dispatch = useDispatch();
    useEffect(() => { if (!userInfo) { props.history.push("/"); } }, [userInfo, props.history]);
    const theme = useSelector(state => state.theme), { color } = theme;
    const nu = useSelector(state=>state.num),{num}=nu;
    const postslist = useSelector(state => state.postlist), { loading, error, list } = postslist;
    const [nav, setnav] = useState("post"), [van, setvan] = useState("public");
    const offline = localStorage.getItem("Posts") ? JSON.parse(localStorage.getItem("Posts")) : [];
    useEffect(() => { dispatch(postlist(userInfo._id)); }, [dispatch,userInfo._id,num]);

    return (
        <div id="user" className={`${color}`}>
            {userInfo ? <Profile img={userInfo.img} username={userInfo.username}
                description={userInfo.description} email={userInfo.email}
                createdAt={userInfo.createdAt} followers={userInfo.followers} allow={true} />
                : ""}

            <div className="parent">
                <div onClick={() => { setnav("post") }} className="child tag is-white">My Posts</div>
                <div onClick={() => { setnav("followers") }} className="child tag is-white">Followers</div>
                <div onClick={() => { setnav("following") }} className="child tag is-white">Following</div>
            </div>

            { nav === "post" ? (<div id="posts">
                <div className="rower">
                    <div onClick={() => setvan("public")} className="rewor tag is-white">Public</div>
                    <div onClick={() => setvan("private")} className="rewor tag is-white">Private</div>
                </div>
                { van === "public" ? (loading ? <Loading> </Loading> : error ? <Error type="red">{error}</Error>
                    : (<div>{list ? list.length === 0 ? (<div> No Posts ! <NavLink to="/add"> Create A New One </NavLink></div>)
                        : list.map((data) => (
                            <Post data={data} allow={true} type="post" hasToDo={false} src={userInfo.img}
                                key={data._id} id={ch(list.indexOf(data))} />
                        )) : ""}
                    </div>))
                    : (offline.length === 0 ? <Error type="blue">You haven't created any Offline Posts</Error>
                        : offline.map((data) => (<OfflinePost data={data} key={ch(offline.indexOf(data))} id={ch(offline.indexOf(data))} />)))}
            </div>)
                : ""}
            { nav === "followers" ? userInfo.followers.length !== 0 ?
                <Followers type="followers" data={userInfo.followers} />
                : <Error type="red">Sorry to Inform ! You've no Followers</Error> : ""}
            {nav === "following" ? userInfo.following.length !== 0 ?
                <Followers type="following" data={userInfo.following} />
                : <Error type="red">You aren't following anyone</Error> : ""}
        </div>
    )
}
export default User;