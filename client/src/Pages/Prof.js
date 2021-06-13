import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postdet } from '../Redux/postActions';
import { Error, Loading, Post } from '../components/Error';
import { Comment, CreateComment } from '../components/off';
import { getComment } from '../Redux/commentAction';
import Swal from 'sweetalert2';

function Prof(props) {
    const id = props.match.params.id, dispatch = useDispatch(),
        user = useSelector(state => state.user), { userInfo } = user,
        theme = useSelector(state => state.theme), { color } = theme;
    if (!userInfo) { Swal.fire({ icon: "warning", html: "You aren't logged in Please Log-in To view this post" }).then(() => { props.history.push("/") }) }
    const det = useSelector((state) => state.det), { loading, error, data } = det,
        c = useSelector(state => state.comments), { loadinglist, comments, errorlist } = c,
        nur = useSelector(state => state.num), { num } = nur;
    useEffect(() => {if(userInfo) dispatch(postdet(id)) }, [dispatch, id,userInfo]);
    useEffect(() => {if(userInfo) dispatch(getComment(id)) }, [id, dispatch, num,userInfo]);
    return (<div className="mt-2">
        { loading ? (<Loading />) : error ? (<Error>{error}</Error>) : data && userInfo ?
            <Post data={data} allow={data.author === userInfo.username ? true : false}
                hasToDo={data.author === userInfo.username ? false : true}
                src={data.author === userInfo.username ? userInfo.img : ""} type="post" />
            : (<></>)}
        {id && <CreateComment _id={id} /> }
        <div className='card-header'><span className={`is-centered card-header-title ${color}`}>Comments</span></div>
        {loadinglist ? <Loading /> : errorlist ? <Error>{errorlist}</Error>
            : comments && comments.length !== 0 ? comments.map((data,index) => (<Comment key={index} data={data}
                _id={data._id}  />)) : "No Comments Made !"}
    </div>)
}
export default Prof;