import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ch } from '../Redux/constants';
import { postdet } from '../Redux/postActions';
import { Error, Loading, Post } from '../components/Error';
import { Comment, CreateComment } from '../components/off';
import { getComment } from '../Redux/commentAction';

function Prof(props) {
    const id = props.match.params.id, dispatch = useDispatch();
    const user = useSelector(state => state.user), { userInfo } = user;
    const det = useSelector((state) => state.det), { loading, error, data } = det;
    const c = useSelector(state => state.comments), { loadinglist, comments, errorlist } = c;
    useEffect(() => { dispatch(postdet(id)) }, [dispatch, id]);
    useEffect(() => { dispatch(getComment(id)) }, [id, dispatch]);
    return (
        <div className="mt-2">
            {
                loading ? (<Loading />) : error ? (<Error type="red">{error}</Error>) : data ?
                    <Post data={data} allow={data.author === userInfo.username ? true : false}
                        hasToDo={data.author === userInfo.username ? false : true}
                        src={data.author === userInfo.username ? userInfo.img : ""} id={ch(-1)} type="post" />
                    : (<></>)
            }
            <CreateComment _id={id} />
            {
                loadinglist ? <Loading /> : errorlist ? <Error type="red">{errorlist}</Error>
                    : comments && comments.length!==0 ? comments.map((data) => (<Comment key={data._id} data={data}
                        _id={data._id} id={ch(comments.indexOf(data))} />)) :"No Comments Made !"
            }
        </div>)
}

export default Prof;