import React, { useEffect, useState } from 'react';
import { FormLabel, SmallLabelForLeft, SmallLabelForRight } from '../components/formele';
import { useDispatch, useSelector } from 'react-redux';
import { editpostaction, postdet } from '../Redux/postActions';
import { NavLink } from 'react-router-dom';
import { Post } from '../components/Error';
import Swal from 'sweetalert2';

function EditPost(props) {
    const id = props.match.params.id, dispatch = useDispatch();
    useEffect(() => { if (id.toString().search(":") === -1) dispatch(postdet(id)) }, [dispatch, id]);
    const user = useSelector(state => state.user), { userInfo } = user,
        det = useSelector(state => state.det), { data } = det,
        theme = useSelector(state => state.theme), { color } = theme,
        [title, settitle] = useState(""), [font, setFont] = useState(`'Calligraffitti', cursive`),
        [content, setContent] = useState(""), t = new Date(),
        [nav, setnav] = useState("edit");
    useEffect(() => { (() => { if (data) { setContent(data.content); setFont(data.font); settitle(data.title) } })() }, [data])
    const posthandler = (e) => {
        e.preventDefault(); if (id.toString().search(":") === -1) { if(title!==""&&content!=="") {dispatch(editpostaction(id, title, font, content))}; }
        else {
            const u = JSON.parse(localStorage.getItem("Posts")), o = { title: title, content: content, font: font, author: userInfo.username, user_id: userInfo._id, createdAt: t.toISOString() }, x = [];
            for (let i = 0; i < u.length; i++) {
                if (u[i].createdAt !== id) { x.push(u[i]); }
            } x.push(o); localStorage.setItem("Posts", JSON.stringify(x));
            if ((localStorage.getItem("success") ? localStorage.getItem("success").toString() : "true") === "true") Swal.fire({ icon: "success", html: "Updated SuccessFully!" })
        }
        setContent(""); setFont(`'Calligraffitti', cursive`); settitle("");
    }
    return (
        <form method="POST" id="add" autoComplete="on" onSubmit={posthandler} className={`container p-1 box ${color}`}>
            <div className={`card-header has-icons-left ${color}`}>
                <NavLink to="/user"> <i className="fas fa-chevron-left icon is-small" style={{ "color": "#485fc7" }}></i> </NavLink>
                <p className={`card-header-title ${color}`}>
                    Edit Post
             <button type="submit" className="button is-success ml-3" >Update</button>
                </p>
            </div>
            <div className="rower">
                <div onClick={() => setnav("edit")} className="rewor is-size-6 tag is-success is-light">Edit</div>
                <div onClick={() => setnav("review")} className="rewor is-size-6 tag is-success is-light">Review</div>
            </div>
            {nav === "edit" ? <div>
                <FormLabel labelfor="title" label="Title" />
                <div className="control has-icons-left has-icons-right">
                    <input type="text" name="title" className="input is-primary" value={title} onChange={(e) => settitle(e.target.value)} required={true} />
                    <SmallLabelForLeft icon="fas fa-heading" />
                    <SmallLabelForRight icon="fas fa-check" />
                </div>
                <hr className="mt-2 mb-2" />
                <FormLabel labelfor="name" label="Font Style" />
                <div className="select">
                    <select style={{ "fontFamily": font }} value={font} onChange={(e) => setFont(e.target.value)}>
                        <option key="Calligraffitti"
                            value={`'Calligraffitti', cursive`}
                            style={{ "fontFamily": "'Calligraffitti', cursive" }}  >Calligraffitti</option>
                        <option key='Caveat'
                            value={`'Caveat', cursive`}
                            style={{ "fontFamily": "'Caveat', cursive" }} >Caveat</option>
                        <option key='Cedarville'
                            value={`'Cedarville Cursive', cursive`}
                            style={{ "fontFamily": "'Cedarville Cursive', cursive" }}  >Cedarville Cursive</option>
                        <option key='key' value={`'Kalam', cursive`} style={{ "fontFamily": `'Kalam', cursive` }}>Kalam</option>
                    </select>
                </div>
                <hr className="mt-2 mb-2" />
                <FormLabel labelfor="cont" label="Content" />
                <textarea name="cont" autoFocus={false} required={true} className={`textarea ${color}`} value={content}
                  rows={25}   onChange={(e) => setContent(e.target.value)}></textarea>
            </div> : <div className="mt-1">
                <Post data={{ user_id: userInfo._id, author: userInfo.username, createdAt: t.toDateString(), content: content, title: title, font: font }}
                     hasToDo={false} src={userInfo.img} allow={false} type="edit" />
            </div>}</form>
    )
}

export default EditPost;
