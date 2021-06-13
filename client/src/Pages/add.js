import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addpost } from "../Redux/postActions";
import { FormLabel, SmallLabelForLeft, SmallLabelForRight } from '../components/formele';
import { Post } from '../components/Error';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

function Add(props) {
    const user = useSelector(state => state.user);
    const { userInfo } = user;
    useEffect(() => { if (!userInfo) { props.history.push("/"); } }, [userInfo, props.history]);
    const theme = useSelector(state => state.theme), { color } = theme,
        [title, settitle] = useState(""), [type, settype] = useState(true), data = new Date(),
        [content, setContent] = useState(`${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`),
        [font, setFont] = useState(`'Calligraffitti', cursive`),
        dispatch = useDispatch(), t = new Date(),[nav, setnav] = useState("edit"),
        posthandler = (e) => {
            e.preventDefault();if(title!==""&&content!=="") {
                dispatch(addpost(title, type, content, font, userInfo.username, userInfo._id));
                setContent(`${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`);
                settype(true); settitle(""); setFont(`'Calligraffitti', cursive`);
            }
            else{Swal.fire({icon:"error",html:'Fill all entries first'})};
        }
    return (
        <form method="POST" id="add" autoComplete="on" onSubmit={posthandler} className={`container p-1 box ${color}`}>
            <div className={`card-header ${color}`}>
                <div className={`card-header-title ${color}`}>
                    New Souvenir
                 <button type="submit" className="button is-success ml-3" >Post</button>
                </div>
                <NavLink to="/glossary"> <code>How to write equations <i className="fas fa-question"></i></code></NavLink>
            </div>
            <div className="rower">
                <div onClick={() => setnav("edit")} className="rewor is-size-6 tag is-success is-light">Edit</div>
                <div onClick={() => setnav("review")} className="rewor is-size-6 tag is-success is-light"> Review</div>
            </div>
            {nav === "edit" ? <div>
                <FormLabel labelfor="title" label="Title" />
                <div className="control has-icons-left has-icons-right">
                    <input type="text" name="title" className="input is-primary" value={title} onChange={(e) => settitle(e.target.value)} required={true} />
                    <SmallLabelForLeft icon="fas fa-heading" />
                    <SmallLabelForRight icon="fas fa-check" />
                </div> <br/>
                <b>I want to post it as</b>{" "}
                   <input type="checkbox" name="name" defaultChecked={true} className="checkbox" onClick={()=>settype(!type)}  />Public<br/>
               <br/> <FormLabel labelfor="name" label="Font Style" />
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
                  rows={25}  onChange={(e) => setContent(e.target.value)}></textarea>
            </div> : <div className="mt-1">
                <Post data={{
                    user_id: userInfo._id, author: userInfo.username,
                    createdAt: t.toISOString(), content: content,
                    title: title, font: font
                }}
                     hasToDo={false} src={userInfo.img} allow={false} type="edit" />
            </div>}</form>
    )
}

export default Add;