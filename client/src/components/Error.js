import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import { URL } from '../Redux/constants'
import { useDispatch } from 'react-redux'
import { deletepost } from '../Redux/postActions'

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

export const Sidebar = (props) => {
    const _id = props.id, user_id = props.uid, username = props.uname,
        [likes, setlikes] = useState(props.likes),
        likehandler = async () => {
            await axios.put(URL + "/api/posts/put/likes", { _id, user_id, username })
                .then(async () => {
                    await axios.get(URL + `/api/posts/get/likes/${_id}`).then(({ data }) => setlikes(data.likes))
                })
                .catch((err) => { return });
        }
    return (
        <ul className="bd-wt-actions">
            <li key="g" className="bd-wt-action is-reply">
                <NavLink to={`/posts/${_id}`} activeClassName="bd-wt-action-link">
                    <div className="bd-wt-icon"></div>
                </NavLink></li>
            <li key="h" className="bd-wt-action is-heart">
                <span onClick={likehandler} className="bd-wt-action-link">
                    <div className="bd-wt-icon"></div>{likes === 0 ? "" : likes}
                </span></li>
            <li key="i" className="bd-wt-action is-share">
                <span className="bd-wt-action-link">
                    <div className="bd-wt-icon"></div>
                </span>
            </li>
        </ul>

    )
}
export const Head = (props) => {
    const [src, setsrc] = useState(""), t = new Date(props.createdAt);
    useEffect(() => {
        (async () => {
            if (props.hasToDo) await axios.get(URL + `/api/user/get/img/${props.data}`).then((res) => { setsrc(res.data) }).catch((e) => console.log(e));
            else setsrc(props.src)
        })()
    }, [props.data, props.hasToDo, props.src]);
    return (
        <NavLink to={`/userProf/${props.data}`}>
            <header className="bd-wt-header">
                <figure className="bd-wt-avatar">
                    <img alt="dat" src={src} />
                </figure>
                <div className="bd-wt-name">
                    <strong className="bd-wt-fullname">{props.uname}</strong>
                    <span className="bd-wt-username">(<Moment fromNow>{t.toISOString()}</Moment>)</span>
                </div>
            </header></NavLink>
    )
}
export const Content = (props) => {
    useEffect(() => {
        if (document.querySelector(`#${props.id}`)) document.querySelector(`#${props.id}`).innerHTML = props.content
    }, [props.content, props.id]);
    return (
        <> <u className="bd-wt-date" style={{ "fontFamily": props.font }}>{props.title}</u>
            <div className="bd-wt-content" style={{ "fontFamily": props.font }} id={props.id}>
                {props.content}
            </div>
        </>
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
                        .then(() => {
                            Swal.fire({ icon: "success", html: "Deleted Successfully" })
                            .then(() => { dispatch(deletepost()) })
                        })
                        .catch((err) => { Swal.fire({ icon: "error", html: err }) })
                } else { return; }
            })
        }
    return (
        <article className="bd-item bd-wt bd-is-huge">
            <Head data={data.user_id ? data.user_id : data._id} hasToDo={props.hasToDo} src={props.src}
                uname={data.author ? data.author : data.username} createdAt={data.createdAt} />
            <NavLink to={data.author ? `/posts/${data._id}` : `/userProf/${data._id}`}>
                <Content id={props.id} content={data.content ? data.content : ""}
                    title={data.title ? data.title : data.description} font={data.font} />
            </NavLink>
            {props.type === "post" ?
                <Sidebar id={data._id} uid={data.user_id}
                    likes={data.likers.length} uname={data.username} />
                : ""}
            {
                allow ? (
                    <footer className="field is-grouped is-grouped-centered">
                        <button className="control button is-danger is-light" onClick={() => deletehandler(data._id)}>
                            Delete</button>
                        <NavLink to={`/edit/post/${data._id}`}>
                            <button className="control button is-link">Edit</button></NavLink>
                    </footer>
                ) : ""
            }
        </article>
    )
}