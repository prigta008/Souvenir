import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import { URL } from '../Redux/constants'
import { anony } from '../Redux/userAction'

export const Error = (props) => {
    return (
        <span style={{ "color": props.type }}>{props.children}</span>
    )
}

export const Loading = () => {
    return (
        <>
            Loading....
        </>
    )
}

export const NotFound = () => {
    return (
        <>Error 404
        </>
    )
}
export const Sidebar = (props) => {
    const _id = props.id, user_id = props.uid, username = props.uname, dispatch = useDispatch(),
        likehandler = async () => {
            await axios.put(URL + "/api/posts/put/likes", { _id, user_id, username })
                .then(() => dispatch(anony()))
                .catch((err) => { return });
        }
    return (
        <nav className="level is-mobile">
            <div className="level-left">
                <span className="level-item">
                    <span className="icon is-small">
                        <i className="fas fa-reply"></i>
                    </span>
                </span>

                <span className="level-item">
                    <span className="icon is-small">
                        <i className="fas fa-retweet"></i>
                    </span>
                </span>

                <span className="level-item">
                    <span onClick={likehandler} className="icon is-small">
                        <i className="fas fa-heart"></i>
                    </span>
                </span>
            </div>
        </nav>

    )
}
export const Dp = (props) => {
    const [src, setsrc] = useState("");
    const fun = async (d) => {
        await axios.get(URL + `/api/user/get/img/${d}`).then((res) => { setsrc(res.data) })
            .catch((e) => console.log(e));
    }
    useEffect(() => { fun(props.data) }, [props.data]);
    return (
        <div className="media-left">
            <figure className="image is-64x64">
                <img alt="dat" src={src} />
            </figure>
        </div>
    )
}
export const Content = (props) => {
    useEffect(() => {
     if (document.querySelector(`#${props.id}`)) document.querySelector(`#${props.id}`).innerHTML = props.content 
    }, [props.content,props.id]);
    return (
        <div className="media-content">
            <p>
                <b>{props.author}</b>
                <br />      (  <small><Moment fromNow>{props.createdAt}</Moment></small>)
                <br />
                <b>{props.title}</b>
                <br />
                <span id={props.id} style={{ "fontFamily": props.font }}>nn</span>
            </p>
        </div>
    )
}
export const Post = (props) => {
    const data = props.data, allow = props.allow, dispatch = useDispatch(),
        deletehandler = (id) => {
            Swal.fire({
                title: "Confirmation", icon: "warning",
                html: "Are You Sure To Delete this Post", showDenyButton: true,
                confirmButtonText: "Yes, I'm Sure", denyButtonText: "No",
                denyButtonColor: "#2778c4", confirmButtonColor: "red"
            }).then(async (res) => {
                if (res.isConfirmed) {
                    await axios.delete(URL + `/api/posts/delete/post/${id}`)
                        .then(() => { Swal.fire({ icon: "success", html: "Deleted Successfully" }).then(dispatch(anony())) })
                        .catch((err) => { Swal.fire({ icon: "error", html: err }) })
                } else { return; }
            })
        }
    return (
        <div>
            <div className="box">
                <article className="media">
                    <Dp data={data.user_id} />
                    <Content author={data.author} createdAt={data.createdAt}
                        font={data.font} content={data.content} title={data.title} id={props.id} />
                    <Sidebar id={data._id} uid={data.user_id} uname={data.author} />
                </article>

                {allow ? <div className="field is-grouped is-grouped-centered">
                    <button onClick={() => deletehandler(data._id)} className="button control is-light is-danger">
                        Delete
                      </button>
                    <NavLink to={`/edit/post/${data._id}`}>
                        <button className="button control is-link">
                            Edit
                           </button>
                    </NavLink>
                </div> : ""}
            </div>
            <br />
        </div>
    )
}