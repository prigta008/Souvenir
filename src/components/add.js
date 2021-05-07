import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addpost } from "../actions/postActions";
import '../App.css';
function Add(props) {
    const user = useSelector(state => state.user);
    const { userInfo } = user;
    useEffect(() => { if (!userInfo) { props.history.push("/"); } }, [userInfo, props.history]);
    const theme = useSelector(state => state.theme);
    const { color } = theme;
    const [title, settitle] = useState("");
    const [type, setType] = useState(true);
    const data = new Date();
    const date = `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
    const [content, setContent] = useState(date);
    const [font, setFont] = useState(`'Calligraffitti', cursive`);
    const dispatch = useDispatch();
    const posthandler = (e) => {
        e.preventDefault();
        dispatch(addpost(title, type, content, font, userInfo.username, userInfo._id, userInfo.img));
        setContent(`${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`);
        setType(true); settitle(""); setFont(`'Calligraffitti', cursive`);
    }
    return (
        <section className="box" id="add" style={color}>
            <h1 className="h1"> New Souvenir </h1>
            <form method="POST" autoComplete="on" onSubmit={posthandler}>
                <button type="submit" className="button is-success" >Post</button>
                <hr />
                <label className="label" htmlFor="title">Title</label>
                <div className="control has-icons-left has-icons-right">
                    <input type="text" name="title" className="input is-primary" value={title} onChange={(e) => settitle(e.target.value)} required={true} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-heading"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>
                <hr />
                <label className="label">I want to keep it as</label>
                <span className="field">
                    <input type="radio" name="que" value={type} onClick={() => setType(true)} />Public
                     <input type="radio" name="que" value={type} onClick={() => setType(false)} /> Private
                 </span>
                <hr />
                Font Style
                <div className="select">
                    <select className="control" value={font} onChange={(e) => setFont(e.target.value)}>
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
                <br /><br />
                <textarea autoFocus={false} required={true} className="textarea is-primary" value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="20" ></textarea>
            </form>
        </section>
    )
}

export default Add;