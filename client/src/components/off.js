import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Content, Head } from "./Error";
import { deletepost, deleteprivate, makePostOffToOn, offedit } from "../Redux/postActions";
import Swal from "sweetalert2";
import { postComment } from "../Redux/commentAction";
import axios from "axios";
import { URL } from "../Redux/constants";
export const OfflinePost = (props) => {
    const data = props.data,{ userInfo }= useSelector(state => state.user),
         { img, username } = userInfo, dispatch = useDispatch(),
        deletehandler = (t) => {
            if ((localStorage.getItem("warning") ? localStorage.getItem("warning").toString() : "true") === "true") {
                Swal.fire({
                    title: "Confirmation", icon: "warning",
                    html: "Are You Sure To Delete this Post", showDenyButton: true,
                    confirmButtonText: "Yes, I'm Sure", denyButtonText: "No",
                    denyButtonColor: "#2778c4", confirmButtonColor: "red"
                }).then((res) => { if (res.isConfirmed) { dispatch(deleteprivate(t)) } else { return; } })
            }
            else { dispatch(deleteprivate(t))}
        },
        edithandler = () => { dispatch(offedit(data)); props.p.history.push(`/edit/post/${data.createdAt}`) },
        addhandler = (t) => {
            if ((localStorage.getItem("warning") ? localStorage.getItem("warning").toString() : "true") === "true") {
                Swal.fire({
                    title: "Confirmation", icon: "warning",
                    html: "Are You Sure To Make It Public", showDenyButton: true,
                    confirmButtonText: "Yes, I'm Sure", denyButtonText: "No",
                    denyButtonColor: "#2778c4", confirmButtonColor: "red"
                }).then((res) => { if (res.isConfirmed) { dispatch(makePostOffToOn(t)) } else { return; } })
            }
            else { dispatch(makePostOffToOn(t)); }
        }
    return (
        <article className="bd-item bd-wt bd-is-huge my-5 py-2">
            <Head hasToDo={false} src={img} data={data._id} uname={username} createdAt={data.createdAt} />
            <Content content={data.content} title={data.title} font={data.font} />
            <div className="field is-grouped is-grouped-centered">
                <button onClick={() => deletehandler(data.createdAt)} className="button is-danger is-light control">Delete</button>
                <button onClick={() => edithandler()} className="button is-link control">Edit</button>
                <button onClick={() => addhandler(data)} className="button is-success control">Make It Public</button>
            </div>
        </article>
    )
}
export const Comment = (props) => {
    const user = useSelector(state => state.user), { userInfo } = user, [data, setdata] = useState(props.data), dispatch = useDispatch(),
        deletehandler = async () => {
            if ((localStorage.getItem("warning") ? localStorage.getItem("warning").toString() : "true") === "true") {
                Swal.fire({
                    title: "Confirmation", icon: "warning",
                    html: "Are You Sure To Delete this Comment", showDenyButton: true,
                    confirmButtonText: "Yes, I'm Sure", denyButtonText: "No",
                    denyButtonColor: "#2778c4", confirmButtonColor: "red"
                }).then(async (res) => {
                    if (res.isConfirmed) {
                        await axios.delete(URL + `/api/comments/delete/comment/${data._id}`)
                            .then(() => { if ((localStorage.getItem("success") ? localStorage.getItem("success").toString() : "true") === "true") Swal.fire({ icon: "success", html: "Deleted Successfully" }); })
                            .then(() => { dispatch(deletepost()) })
                            .catch((err) => { if ((localStorage.getItem("error") ? localStorage.getItem("error").toString() : "true") === "true") Swal.fire({ icon: "error", html: err }) })
                    }
                    else { return; }
                }
                )
            }
            else {
                await axios.delete(URL + `/api/comments/delete/comment/${data._id}`)
                    .then(() => { if ((localStorage.getItem("success") ? localStorage.getItem("success").toString() : "true") === "true") Swal.fire({ icon: "success", html: "Deleted Successfully" }); })
                    .then(() => { dispatch(deletepost()) })
                    .catch((err) => { if ((localStorage.getItem("error") ? localStorage.getItem("error").toString() : "true") === "true") Swal.fire({ icon: "error", html: err }) })
            }
        },
        edithandler = () => {
            Swal.fire({ title: "Content For Comment Editing", input: "text", inputAttributes: { autocapitalize: "off" }, showCancelButton: true, confirmButtonText: "Done" })
                .then(async (res) => {
                    if (res.value !== undefined) {
                        await axios.put(URL + "/api/comments/put/comment", { comment: res.value, _id: props._id })
                            .then(() => { if ((localStorage.getItem("success") ? localStorage.getItem("success") : "true") === "true") Swal.fire({ icon: "success", html: "Updated SuccessFully" }) })
                            .then(async () => await axios.get(URL + `/api/comments/get/comment/${data._id}`)
                                .then(({ data }) => setdata(data)))
                            .catch((err) => { if ((localStorage.getItem("error") ? localStorage.getItem("error") : "true") === "true") Swal.fire({ icon: "error", html: err }) })
                    }
                })
        }
    return (
        <div className="bd-item p-4 ml-1 mb-6 bd-wt bd-is-huge ">
            <Head hasToDo={true} src="" data={data.user_id} uname={data.author} createdAt={data.createdAt} />
            <Content content={data.content} title="" font="inherit" />
            {
                data.user_id === userInfo._id && (
                    <div className="field is-grouped is-grouped-centered">
                        <button onClick={() => edithandler()} className="button control is-link">Edit</button>
                        <button onClick={() => deletehandler()} className="button control is-danger is-light">Delete</button>
                    </div>
                )
            }
        </div>
    )
}

export const CreateComment = (props) => {
    const user = useSelector(state => state.user), { userInfo } = user, dispatch = useDispatch(),
        [content, setcontent] = useState(""),
        submithandler = (e) => {
            e.preventDefault();
            dispatch(postComment(userInfo.username, userInfo._id, props._id, content));
        }
    return (
        <article className="media card box">
            {userInfo && (<>  <figure className="bd-wt-avatar my-0 ml-0 mr-1">
                <img aria-hidden="true" alt="dat" src={userInfo.img} />
            </figure>
                <div className="media-content">
                    <div className="field">
                        <p className="control">
                            <textarea value={content} onChange={(e) => setcontent(e.target.value)}
                                className="textarea" placeholder="Add A Comment..."></textarea>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <button onClick={(e) => submithandler(e)} className="button is-success">Add Comment</button>
                        </p>
                    </div>
                </div></>)}
        </article>
    )
}