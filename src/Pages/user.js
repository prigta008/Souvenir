import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Loading, Error, Post } from '../components/Error';
import { postlist } from '../Redux/postActions';
import { Followers, Profile } from '../components/formele';
import { ch } from '../Redux/constants';

function User(props) {
    
    const user = useSelector(state => state.user);
    const { userInfo } = user;
    const dispatch = useDispatch();
    useEffect(() => { if (!userInfo) { props.history.push("/"); } }, [userInfo, props.history]);
    const theme = useSelector(state => state.theme), { color } = theme;
    const [nav, setnav] = useState("post");
    const postslist = useSelector(state => state.postlist);
    var { loading, error, list } = postslist;
    const nur = useSelector(state => state.num), { num } = nur;
    useEffect(() => { dispatch(postlist(userInfo._id)); }, [dispatch, userInfo, num]);
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
                {loading ? <Loading> </Loading> : error ? <Error type="red">{error}</Error>
                    : (<div>{list?list.length === 0 ? (<div> No Posts ! <NavLink to="/add"> Create A New One </NavLink></div>)
                        : list.map((data) => (
                            <Post data={data} allow={true} type="post"
                                key={data._id} id={ch(list.indexOf(data))} />
                        )):""}
                    </div>)
                }
            </div>)
                : ""}
            { nav === "followers" ? userInfo.followers.length !== 0 ?
                <Followers data={userInfo.followers} />
                : <Error type="red">Sorry to Inform ! You've no Followers</Error> : ""}
            {nav === "following" ? userInfo.following.length !== 0 ?
                <Followers data={userInfo.following} />
                : <Error type="red">You aren't following anyone</Error> : ""}
        </div>
    )
}
export default User;