import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addpost } from "../Redux/postActions";
import { FormLabel, SmallLabelForLeft, SmallLabelForRight } from '../components/formele';

function Add(props) {
    const user = useSelector(state => state.user);
    const { userInfo } = user;
    useEffect(() => { if (!userInfo) { props.history.push("/"); } }, [userInfo, props.history]);
    const theme = useSelector(state => state.theme), { color } = theme;
    const [title, settitle] = useState("");
    const [type, settype] = useState(true);
    const data = new Date();
    const [content, setContent] = useState(`${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`);
    const [font, setFont] = useState(`'Calligraffitti', cursive`);
    const dispatch = useDispatch();
    const posthandler = (e) => {
        e.preventDefault();
        dispatch(addpost(title, type, content, font, userInfo.username, userInfo._id));
        setContent(`${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`);
        settype(true);
        settitle(""); setFont(`'Calligraffitti', cursive`);
    }
    return (
            <form method="POST" id="add" autoComplete="on" onSubmit={posthandler} className={`container box ${color}`}>
                <div className={`card-header ${color}`}>
                    <div className={`card-header-title ${color}`}>
                        New Souvenir
                 <button type="submit" className="button is-success ml-3" >Post</button>
                    </div>
                </div>
                <FormLabel labelfor="title" label="Title" />
                <div className="control has-icons-left has-icons-right">
                    <input type="text" name="title" className="input is-primary" value={title} onChange={(e) => settitle(e.target.value)} required={true} />
                    <SmallLabelForLeft icon="fas fa-heading" />
                    <SmallLabelForRight icon="fas fa-check" />
                </div>
                <hr className="mt-2 mb-2" />
                <FormLabel labelfor="name" label="I want to post it as" />
                <div className="control">
                    <label className="radio">
                        <input type="radio" onChange={(e) => settype(true)} value={true} name="answer" />
                                     Public
                             </label>
                    <label className="radio">
                        <input type="radio" onChange={(e) => settype(false)} value={false} name="answer" />
                           Private
                         </label>
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
                        <option key='Apple'
                            value={`'Homemade Apple', cursive`}
                            style={{ "fontFamily": "'Homemade Apple', cursive" }}   >Homemade Apple</option>
                    </select>
                </div>
               <hr className="mt-2 mb-2" />
               <FormLabel labelfor="cont" label="Content"/>
                <textarea name="cont" autoFocus={false} required={true} className={`textarea ${color}`} value={content}
                    onChange={(e) => setContent(e.target.value)}></textarea>
            </form>
    )
}

export default Add;