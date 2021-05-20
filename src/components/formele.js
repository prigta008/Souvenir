import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";
import axios from "axios";
import { URL } from "../Redux/constants";
import { useSelector } from "react-redux";
export const FormLabel = (props) => {
    const theme = useSelector(state => state.theme), { color } = theme;
    return (
        <div>
            <label className={`label ${color}`} htmlFor={props.labelfor}>{props.label}</label>
        </div>
    )
}
export const SmallLabelForLeft = (props) => {
    return (
        <span className="icon is-small is-left">
            <i className={props.icon}></i>
        </span>
    )
}
export const SmallLabelForRight = (props) => {
    return (
        <span className="icon is-small is-right">
            <i className={props.icon}></i>
        </span>
    )
}
export const FileLabel = () => {
    return (
        <span className="file-cta">
            <span className="file-icon">
                <i className='fas fa-upload'></i>
            </span>
            <span className="file-label">
                Choose a File...
        </span>
        </span>
    )
}
export const LastButton = (props) => {
    return (
        <div className="field is-grouped is-grouped-centered">
            <button className="button control is-success" type="submit" disabled={props.dis}>
                Submit
       </button>
            <button type="reset" className="button control is-success is-light">Clear</button>
        </div>
    )
}
export const Profile = (props) => {
    return (
        <div className="box">
            <div className="card-image">
                <figure className="image is-4by4">
                    <img width="100%" height="auto" src={props.img} alt="profile" />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src={props.img} alt="profile" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">
                            {props.username}
                            <br />
                            {props.allow ? <NavLink to="/edit/user" >
                                <span className="tag o-circle is-medium"><i className="fas fa-pen-alt"></i>Edit
                                </span>
                            </NavLink> : ""}
                        </p>
                    </div>
                </div>
                <div className="content">
                    <u> About</u>   {props.description}<hr />
                    {props.allow ? <span> <u>Email</u>   {props.email} <hr /></span> : ""}
                    <u>Joined</u>   <Moment fromNow>{props.createdAt}</Moment>
                    {
                        props.followers ? props.followers.length !== 0 ? (<p><u>Followers</u> {props.followers.length}</p>) : "" : ""
                    }
                </div>
            </div>
        </div>
    )
}
export const Followers = (props) => {
    const [every, setevery] = useState([]),
        fun = async (t) => {
            var o = [];
            for (let i = 0; i < props.data.length; i++) {
                const { data } = await axios.get(URL + `/api/user/get/userdet/${t[i].id}`);
                o.push(data);
            }
            setevery(o);
        }
    useEffect(()=>{fun(props.data) },[props.data])
    return (
        <div>
            hello
            {
                every.map((e) => (
                    <div key={e._id}>
                        { e.username}
                    </div>
                ))}
        </div>
    )
}