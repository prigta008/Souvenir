import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import { URL } from '../Redux/constants'
import { useDispatch, useSelector } from 'react-redux'
import { deletepost } from '../Redux/postActions'
import place from "../images/place.png"
import "katex/dist/katex.min.css"
import { BlockMath, InlineMath } from 'react-katex'
export const Error = (props) => { return (<span style={{ "color": "#485fc7" }}>{props.children}</span>) }
export const Loading = () => { const t = useSelector(state => state.theme), { color } = t; return (<div className={`${color}`}> Loading.... </div>) }
export const Sidebar = (props) => {
    const _id = props.id, user_id = props.uid, username = props.uname,
        [likes, setlikes] = useState(props.likes), [comments, setcomments] = useState(0),
        likehandler = async () => {
            await axios.put(URL + "/api/posts/put/likes", { _id, user_id, username })
                .then(async () => {
                    await axios.get(URL + `/api/posts/get/likes/${_id}`).then(({ data }) => setlikes(data.likes))
                }).catch((err) => { return });
        },
        sharehandler = async () => {
            await window.navigator.share({ title: "Souvenir", text: "Read The Post At Souvenir", url: `https://sharp-almeida-889585.netlify.app/posts/${_id}` });
        }
    useEffect(() => {
        (async () => { await axios.get(URL + `/api/comments/get/length/${_id}`).then((res) => setcomments(res.data.length)) })()
    }, [_id])
    return (
        <ul className="bd-wt-actions">
            <li key="g" className="bd-wt-action is-reply">
                <span className="bd-wt-action-link">
                    <NavLink to={`/posts/${_id}`}>
                        <div className="bd-wt-icon"></div>{comments === 0 ? "" : comments}
                    </NavLink></span></li>
            <li key="h" className="bd-wt-action is-heart">
                <span onClick={likehandler} className="bd-wt-action-link">
                    <div className="bd-wt-icon"></div>{likes === 0 ? "" : likes}
                </span></li>
            <li key="i" className="bd-wt-action is-share">
                <span onClick={sharehandler} className="bd-wt-action-link">
                    <div className="bd-wt-icon"></div>
                </span>
            </li>
        </ul>

    )
}
export const Head = (props) => {
    const [src, setsrc] = useState(place), t = new Date(props.createdAt);
    useEffect(() => {
        (async () => {
            if (props.hasToDo) await axios.get(URL + `/api/user/get/img/${props.data}`).then((res) => { setsrc(res.data) }).catch((e) => console.log(e));
            else setsrc(props.src)
        })()
    }, [props.data, props.hasToDo, props.src]);
    return (
        <NavLink to={`/userProf/${props.data}`}>
            <header className="bd-wt-header my-3">
                <figure className="bd-wt-avatar mx-2 my-0">
                    <img aria-hidden="true" alt="dat" src={src} />
                </figure>
                <div className="bd-wt-name">
                    <strong className="bd-wt-fullname">{props.uname}</strong>
                    <span className="bd-wt-username is-size-7">(<Moment fromNow>{t.toISOString()}</Moment>)</span>
                </div>
            </header></NavLink>
    )
}
export const Content = (props) => {
    const check = (t) => { return t.search("₹₹₹") === -1 };
    return (
        <> <u className="bd-wt-date is-size-6 mt-3 ml-2"
            style={{ "fontFamily": props.font }}>{props.title}</u>
            <div className="bd-wt-content ml-2" style={{ "fontFamily": props.font }}>
                {props.content.split("\n").map((t, index) => check(t)
                    ? <div key={index}>{t.split("₹₹").map((y, i) => i % 2 === 0
                        ? <span key={i} style={{ "fontFamily": props.font }}>{y}</span>
                        : <InlineMath renderError={(e) => { return <b>Fail: {e.name}</b> }} key={i} math={y} />)}</div>
                    : t.split("₹₹₹").map((x, index) => index % 2 === 0
                        ? (x.split("₹₹").map((x, y) => y % 2 === 0
                            ? <span key={y} style={{ "fontFamily": props.font }}>{x}</span>
                            : <InlineMath renderError={(e) => { return <b>Fail: {e.name}</b> }} key={y} math={x} />)
                        ) : <BlockMath renderError={(e) => { return <b style={{ "color": "#cc0000" }}>Fail: {e.name}</b> }} key={index} math={x} />
                    ))
                }</div>
        </>
    )
}
export const Post = (props) => {
    const data = props.data, allow = props.allow, dispatch = useDispatch(),
        deletehandler = async (id) => {
            if ((localStorage.getItem("warning") ? localStorage.getItem("warning") : "true") === "true") {
                Swal.fire({
                    title: "Confirmation", icon: "warning",
                    html: "Are You Sure To Delete this Post", showDenyButton: true,
                    confirmButtonText: "Yes, I'm Sure", denyButtonText: "No",
                    denyButtonColor: "#2778c4", confirmButtonColor: "red"
                }).then(async (res) => {
                    if (res.isConfirmed) {
                        await axios.delete(URL + `/api/posts/delete/post/${id}`)
                            .then(() => {
                                if ((localStorage.getItem("success") ? localStorage.getItem("success") : "true") === "true") {
                                    Swal.fire({ icon: "success", html: "Deleted Successfully" })
                                        .then(() => { dispatch(deletepost()) })
                                }
                            })
                            .catch((err) => { if ((localStorage.getItem("error") ? localStorage.getItem("error") : "true") === "true") Swal.fire({ icon: "error", html: err }) })
                    } else { return; }
                })
            } else {
                await axios.delete(URL + `/api/posts/delete/post/${id}`)
                    .then(() => {
                        if ((localStorage.getItem("success") ? localStorage.getItem("success") : "true") === "true") {
                            Swal.fire({ icon: "success", html: "Deleted Successfully" })
                                .then(() => { dispatch(deletepost()) })
                        }
                    })
                    .catch((err) => { if ((localStorage.getItem("error") ? localStorage.getItem("error") : "true") === "true") Swal.fire({ icon: "error", html: err }) })
            }
        }
    return (
        <article className="bd-item p-4 ml-1 mb-6 bd-wt bd-is-huge ">
            <Head data={data.user_id ? data.user_id : data._id} hasToDo={props.hasToDo} src={props.src}
                uname={data.author ? data.author : data.username} createdAt={data.createdAt} />
            {props.type === "post" || props.type === "user" ? <NavLink to={data.author ? `/posts/${data._id}` : `/userProf/${data._id}`}>
                <Content content={data.content ? data.content : ""}
                    title={data.title ? data.title : data.description} font={data.font} />
            </NavLink>
                : <Content content={data.content ? data.content : ""}
                    title={data.title ? data.title : data.description} font={data.font} />}
            {props.type === "post" ?
                <Sidebar id={data._id} uid={data.user_id} title={data.title ? data.title : data.description}
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