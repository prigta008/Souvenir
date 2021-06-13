import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Loading, Error, Post } from '../components/Error';
import { postlist } from '../Redux/postActions';
import { Followers, Profile } from '../components/formele';
import { OfflinePost } from '../components/off';
import { dataUpToDate } from '../Redux/userAction';
function User(props) {
    const user = useSelector(state => state.user), { userInfo } = user, dispatch = useDispatch();
    useEffect(() => { if (!userInfo) { props.history.push("/"); } }, [userInfo, props.history]);
    const theme = useSelector(state => state.theme), { color } = theme,
        nu = useSelector(state => state.num), { num } = nu,
        postslist = useSelector(state => state.postlist), { loading, error, list } = postslist,
        [nav, setnav] = useState("post"), [van, setvan] = useState("public"),
        [offline, setoffline] = useState(localStorage.getItem("Posts") ? JSON.parse(localStorage.getItem("Posts")).reverse() : [])
    useEffect(() => {
        dispatch(dataUpToDate(userInfo._id))
    }, [userInfo._id, dispatch]);
    useEffect(() => { if (userInfo) dispatch(postlist(userInfo._id)); }, [dispatch, userInfo, num]);
    useEffect(() => { (() => setoffline(localStorage.getItem("Posts") ? JSON.parse(localStorage.getItem("Posts")).reverse() : []))() }, [num])
    return (
        <div id="user" className={`${color}`}>
            {userInfo ? <Profile img={userInfo.img} username={userInfo.username}
                description={userInfo.description} email={userInfo.email}
                createdAt={userInfo.createdAt} followers={userInfo.followers} allow={true} />
                : ""}
            <div className="parent">
                <div onClick={() => { setnav("post") }} className="child is-size-6 tag is-white">My Posts</div>
                <div onClick={() => { setnav("followers") }} className="child is-size-6 tag is-white">Followers</div>
                <div onClick={() => { setnav("following") }} className="child is-size-6 tag is-white">Following</div>
            </div>
            <br />
            {nav === "post" ? (<div id="posts">
                <div className="rower mb-1">
                    <div onClick={() => setvan("public")} className="rewor is-size-6 tag is-white">Public</div>
                    <div onClick={() => setvan("private")} className="rewor is-size-6 tag is-white">Private</div>
                </div>
                {van === "public" ? (loading ? <Loading> </Loading> : error ? <Error>{error}</Error>
                    : (<div>{list ? list.length === 0 ? (<div> No Posts ! <NavLink to="/add"><span style={{ "color": "#487fc7" }}> Create A New One</span> </NavLink></div>)
                        : list.map((data) => (
                            <Post data={data} allow={true} type="post" hasToDo={false} src={userInfo.img}
                                key={data._id} />
                        )) : ""}
                    </div>))
                    : (offline.length === 0 ? <Error>You haven't created any Offline Posts</Error>
                        : offline.map((data, index) => (<OfflinePost p={props} data={data} key={index} />)))}
            </div>)
                : ""}
            {nav === "followers" ? userInfo.followers.length !== 0 ?
                <Followers type="followers" data={userInfo.followers} />
                : <Error type="red">Sorry to Inform ! You've no Followers</Error> : ""}
            {nav === "following" ? userInfo.following.length !== 0 ?
                <Followers type="following" data={userInfo.following} />
                : <Error type="red">You aren't following anyone</Error> : ""}
        </div>
    )
}
export default User;