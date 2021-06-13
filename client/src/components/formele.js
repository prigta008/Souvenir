import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";
import axios from "axios";
import { URL } from "../Redux/constants";
import { useDispatch, useSelector } from "react-redux";
import { Content, Error, Head, Loading } from "./Error";
import { followaction } from "../Redux/userAction";
export const FormLabel = (props) => {
    const theme = useSelector(state => state.theme), { color } = theme;
    return (<label className={`label ${color}`} htmlFor={props.labelfor}>{props.label}</label>)
}
export const SmallLabelForLeft = (props) => {
    return (<span className="icon is-small is-left"><i aria-hidden="true" className={props.icon}></i></span>)
}
export const SmallLabelForRight = (props) => {
    return (<span className="icon is-small is-right"> <i aria-hidden="true" className={props.icon}></i></span>)
}
export const FileLabel = () => {
    return (
        <span className="file-cta">
            <span className="file-icon"><i className='fas fa-upload'></i></span>
            <span className="file-label">Choose a File...</span>
        </span>
    )
}
export const LastButton = (props) => {
    return (
        <div className="field is-grouped is-grouped-centered">
            <button className="button control is-success" type="submit" disabled={props.dis}> Submit</button>
            <button type="reset" className="button control is-success is-light">Clear</button>
        </div>
    )
}
export const Profile = (props) => {
    return (
        <div className="box">
            <div className="card-image">
                <figure className="image">
                    <img src={props.img} width="100%" height='auto' alt="Placeholder" />
                </figure>
            </div>
            <div className="card-content p-1 mt-1">
                <div className="media">
                    <div className="media-left">
                        <figure className="bd-wt-avatar mx-2 my-0">
                            <img alt="dat" src={props.img} />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">
                            {props.username}
                            {props.allow ? <NavLink to="/edit/user" >
                                <span className="tag is-rounded ml-2 is-medium"><i className="fas fa-pen-alt"></i>Edit
                                </span>
                            </NavLink> : ""}
                        </p>
                    </div>
                </div>
                <div className="content">
                    <u> About</u>   {props.description}<hr />
                    {props.allow ? <span> <u>Email</u>   {props.email}<hr /></span> : ""}
                    <u>Joined</u>   <Moment fromNow>{props.createdAt}</Moment>
                    {
                        props.followers ? props.followers.length !== 0 ? (<div><hr /><u>Followers</u> {props.followers.length}</div>) : "" : ""
                    }
                </div>
            </div>
        </div>
    )
}
export const Followers = (props) => {
    const [every, setevery] = useState([]), [load, setload] = useState(true), nu = useSelector(state => state.num), { num } = nu,
        [error, seterror] = useState(""), dispatch = useDispatch(),
        user = useSelector(state => state.user), { userInfo } = user,
        followhandler = (a, b) => {
            dispatch(followaction(a, b));
        },
        bool = (t) => {
            if (load && error) { return; }
            else {
                for (let i = 0; i < t.length; i++) {
                    if (userInfo._id === t[i].id) { return true }
                }
            }
        };
    useEffect(() => {
        (async () => {
            var o = [];
            for (let i = 0; i < props.data.length; i++) {
                try {
                    const { data } = await axios.get(URL + `/api/user/get/userdet/${props.data[i].id}`);
                    o.push(data);
                } catch (error) {
                    setload(false); seterror(error.toString())
                }
            }
            setevery(o); setload(false);
        })()
    }, [user, props.data, num]);
    return (
        <div>
            {load ? <Loading />
                : error !== "" ? <Error>{error}</Error>
                    : every.map((data) => (
                        <div key={data._id} className="bd-item bd-wt bd-is-huge">
                            <Head hasToDo={false} src={data.img} data={data._id} uname={data.username}
                                createdAt={data.createdAt} />
                            <NavLink to={`/userProf/${data._id}`}>
                                <Content  content={data.description} title="About" font="inherit" />
                            </NavLink>
                            {props.type === "followers" && <p className="footer ml-6 my-2 p-1 is-centered">
                                <button onClick={() => followhandler(userInfo._id, data._id)} className="button is-link">
                                    {bool(data.followers) ? 'UnFollow' : "Follow"}</button>
                            </p>}                  </div>
                    ))}
        </div>
    )
}