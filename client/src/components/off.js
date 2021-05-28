import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Content, Head } from "./Error";
import { deleteprivate, makePostOffToOn } from "../Redux/postActions";
import Swal from "sweetalert2";
import { postComment } from "../Redux/commentAction";
import axios from "axios";
import { URL } from "../Redux/constants";
export const OfflinePost = (props) => {
    const data = props.data, user = useSelector(state => state.user),
        { userInfo } = user, { img, username } = userInfo, dispatch = useDispatch(),
        deletehandler = (t) => {
            Swal.fire({
                title: "Confirmation", icon: "warning",
                html: "Are You Sure To Delete this Post", showDenyButton: true,
                confirmButtonText: "Yes, I'm Sure", denyButtonText: "No",
                denyButtonColor: "#2778c4", confirmButtonColor: "red"
            }).then((res) => { if (res.isConfirmed) { deleteprivate(t) } else { return; } })
        },
        addhandler = (t) => {
            Swal.fire({
                title: "Confirmation", icon: "warning",
                html: "Are You Sure To Make It Public", showDenyButton: true,
                confirmButtonText: "Yes, I'm Sure", denyButtonText: "No",
                denyButtonColor: "#2778c4", confirmButtonColor: "red"
            }).then((res) => { if (res.isConfirmed) { dispatch(makePostOffToOn(t)) } else { return; } })
        }
    return (
        <article className="bd-item bd-wt bd-is-huge">
            <Head hasToDo={false} src={img} data={data._id} uname={username} createdAt={data.createdAt} />
            <Content id={props.id} content={data.content} title={data.title} font={data.font} />
            <div className="field is-grouped is-grouped-centered">
                <button onClick={() => deletehandler(data.createdAt)} className="button is-danger is-light control">Delete</button>
                <button className="button is-link control">Edit</button>
                <button onClick={() => addhandler(data)} className="button is-success control">Make It Public</button>
            </div>
        </article>
    )
}
export const Comment = (props) => {
    const user = useSelector(state => state.user), { userInfo } = user, data = props.data,
        deletehandler = () => {
            Swal.fire({
                title: "Confirmation", icon: "warning",
                html: "Are You Sure To Delete this Comment", showDenyButton: true,
                confirmButtonText: "Yes, I'm Sure", denyButtonText: "No",
                denyButtonColor: "#2778c4", confirmButtonColor: "red"
            }).then(async (res) => {
                if (res.isConfirmed) {
                    await axios.delete(URL + `/api/comments/delete/comment/${props._id}`)
                        .then()
                        .catch((err) => Swal.fire({ icon: "error", html: err }))
                }
                else { return; }
            }
            )
        },
        edithandler = () => {
            Swal.fire({ title: "Content For Comment Editing", input: "text", inputAttributes: { autocapitalize: "off" }, showCancelButton: true, confirmButtonText: "Done"})
                .then(async (res) => {
                    console.log(res.value);
                    if (res.value !== undefined) {
                        await axios.put(URL + "/api/comments/put/comment", { comment: res.value , _id:props._id })
                            .then(() => Swal.fire({ icon: "success", html: "Updated SuccessFully" }))
                            .catch((err)=>Swal.fire({icon:"error",html:err}))
                    }
                })
        }
    return (
        <div>
            <Head hasToDo={true} src="" data={data.user_id} uname={data.author} createdAt={data.createdAt} />
            <Content id={props.id} content={data.content} title="" font="inherit" />
            {
                data.user_id === userInfo._id && (
                    <div className="field is-grouped">
                        <button onClick={() => edithandler()} className="button is-link">Edit</button>
                        <button onClick={() => deletehandler()} className="button is-danger is-light">Delete</button>
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
        <article className="media">
            <figure className="media-left">
                <p className="image is-64x64">
                    <img alt="profile" className="image" src={userInfo.img} />
                </p>
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
                        <button onClick={(e) => submithandler(e)} className="button is-success">Post Comment</button>
                    </p>
                </div>
            </div>
        </article>
    )
}