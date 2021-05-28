import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletepost, postlist } from '../Redux/postActions';
import { userdetaction } from '../Redux/userAction';
import { ch, URL } from '../Redux/constants';
import { Error, Loading, Post } from '../components/Error';
import { Profile } from '../components/formele';
import Swal from 'sweetalert2';
import axios from 'axios';

function UserProf(props) {

    var id = props.match.params.id,
        user = useSelector(state => state.user), { userInfo } = user,
        det = useSelector(state => state.userdet), { loading, error, data } = det,
        nu = useSelector(state => state.num), { num } = nu,
        dispatch = useDispatch(),
        pos = useSelector(state => state.postlist), { list } = pos,
        bool = () => {
            if (data) {
                for (let i = 0; i < data.followers.length; i++) {
                    if (userInfo._id === data.followers[i].id) { return true }
                }
            }
        },
        followhandler = async () => {
            const subject = userInfo._id, object = id;
            try {
                await axios.put(URL + "/api/user/put/follow", { subject, object })
                    .then((res) => {
                        localStorage.setItem("UserInfo", JSON.stringify(res.data.s));
                        data = res.data.o
                    })
                    .then(() => dispatch(deletepost()))
            }
            catch (error) { Swal.fire({ icon: "error", html: error }) }
        }
    useEffect(() => { dispatch(userdetaction(id)) }, [dispatch, id, num]);
    useEffect(() => { dispatch(postlist(id)); }, [dispatch, data, id]);
    return (
        <div>
            {  loading ? <Loading></Loading> : error ? <Error>{error}</Error> : data ? (
                <Profile img={data.img} username={data.username} allow={false} description={data.description}
                    email='' followers={data.followers} createdAt={data.createdAt} />
            ) : <></>}
            {data ? data._id !== userInfo._id ?
                <button onClick={() => followhandler()} className="button is-link">{bool() ? "UnFollow" : "Follow"}</button>
                : "" : ""}
            <hr />
            <div>
                <div className="box mb-2 is-centered">Posts</div>
                {list ? list.length !== 0 ? (
                    <div>
                        {list.map((data) => (
                            <Post key={data._id} hasToDo={true} src="" allow={false} data={data} type='post' id={ch(list.indexOf(data))} />
                        ))}
                    </div>) : (<p>No Posts Created</p>) : ""
                }
            </div>
        </div>
    )
}

export default UserProf;