import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { Loading, Error } from './Error';
import { updateuser } from '../actions/userAction';
import "../styles/phone_tab.css";
function Data() {
    return (<></>)
}
function User(props) {
    const user = useSelector(state => state.user);
    const { userInfo } = user;
    const postlist = useSelector(state => state.postlist);
    const { loading, error, list } = postlist;
    console.log(list);
    const [password, setPassword] = useState("");
    const [username, setname] = useState(userInfo.username);
    const [age, setage] = useState(userInfo.age);
    const [desc, setdesc] = useState(userInfo.description ? userInfo.description : "");
    const _id = userInfo._id;
    const dispatch = useDispatch();
    const submithandler = (e) => {
        e.preventDefault();
        dispatch(updateuser(_id, username, desc, age, password));
    }
    useEffect(() => {
        if (!userInfo) {
            props.history.push("/");
        }
    }, [userInfo, props.history])
    const [change, setChange] = useState(false);
    return (
        <div>
            <span onClick={() => setChange(true)} id="write" > <i className="fas fa-pen-alt"></i></span>
            <div id="img">
                {
                    userInfo.image ?
                        <img width="50vw" height="50vw"
                            style={{ 'borderRadius': "50%" }} src={userInfo.image} alt="wait"></img>
                        : <span style={{ "fontSize": "32px", 'borderRadius': "50%" }} className="fas fa-user"></span>
                }
            </div><hr />
            Username :  {userInfo.username} <hr />
            About : {userInfo.description} <hr />
            Age:  {userInfo.age} <hr />
            Joined  : <Moment fromNow>{userInfo.createdAt}</Moment><hr />
            Email-Address : {userInfo.email} <hr />
            <div id="posts">
                {
                    loading ? <Loading>   </Loading> :
                        error ? <Error type="red">{error}</Error> :
                            <>
                                {     //this has to be updated
                                    list ? list.map((data) => (<Data data={data} />)) : <></>
                                }
                            </>
                }
            </div>

            {
                change ?
                    <>  <form method="POST" onSubmit={submithandler} encType="multipart/form-data">
                        Username : <br />
                        <input req='true' type="text" value={username}
                            onChange={(e) => { setname(e.target.value) }} /> <br />
                       New Password : <br />
                        <input req='true' type="password" value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }
                            } />  <br />
                        Age : <br />
                        <input req='true' type="number" value={age}
                            onChange={(e) => { setage(e.target.value) }} />  <br />
                        About : <br />
                        <input req='true' type="text" value={desc}
                            onChange={(e) => { setdesc(e.target.value) }} /> <br />
                        <button type="submit" className="button is-success">Submit</button>
                    </form> <br /><br /><br />h</> :
                    <></>
            }
        </div>
    )
}

export default User;
