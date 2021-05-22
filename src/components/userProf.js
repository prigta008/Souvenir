import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postlist } from '../Redux/postActions';
import { followaction, userdetaction } from '../Redux/userAction';
import { ch } from '../Redux/constants';
import { Error, Loading, Post } from './Error';
import { Profile } from './formele';

function UserProf(props) {

    const id = props.match.params.id;
    const user = useSelector(state => state.user);
    const { userInfo } = user;
    const det = useSelector(state => state.userdet);
    const { loading, error, data } = det;
    const dispatch = useDispatch();
    useEffect(() => { dispatch(userdetaction(id)) }, [dispatch, id]);
    const pos = useSelector(state => state.postlist);
    var { list } = pos;
    if (list === undefined) { list = [] }
    useEffect(() => { dispatch(postlist(id)); }, [dispatch, id]);
    const followhandler = () => {
        dispatch(followaction(userInfo._id, id));
    }
    return (
        <div>
            {  loading ? <Loading></Loading> : error ? <Error>{error}</Error> : data ? (
                <div>
                    { data ? <Profile img={data.img} username={data.username} allow={false}
                        description={data.description} email={data.email}
                        createdAt={data.createdAt} followers={data.followers} /> : ""}
                    {
                        userInfo._id !== data._id
                            ? (<button onClick={followhandler} id="follow" className="button is-link">
                                 Follow
                                 </button>) : (<></>)
                    }
                </div>
            ) : <></>}
            <hr />
            <div className="card box is-fullwidth">
                <div className="card-header is-centered">
                    <div className="card-header-title is-centered">Posts</div>
                </div>
                {list ? list.length !== 0 ? (
                    <div>
                        {list.map((data) => (
                            <Post key={data._id} allow={false} data={data} type='post' id={ch(list.indexOf(data))} />
                        ))}
                    </div>) : (<p>No Posts Created</p>) : (<p>No Posts Created</p>)
                }
            </div>
        </div>
    )
}

export default UserProf;