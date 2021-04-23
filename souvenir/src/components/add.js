import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addpost } from "../actions/postActions";
import "../styles/phone_tab.css";
function Add(props) {
    const user = useSelector(state => state.user);
    const { userInfo } = user;
    useEffect(() => {
        if (!userInfo) {
            props.history.push("/");
        }
    }, [userInfo, props.history]);
    const [title, settitle] = useState("");
    const [type, setType] = useState(true);
    const [content, setContent] = useState("");
    const [font, setFont] = useState(`'Calligraffitti', cursive`);
    const dispatch = useDispatch();
    const posthandler = (e) => {
        e.preventDefault();
        dispatch(addpost(title, type, content, font, userInfo.username, userInfo._id));
    }
    return (
        <div>
            <h1> New Souvenir </h1>
            <form method="POST" onSubmit={posthandler}>
                <button type="submit" className="button is-success" >Post</button> <br />
          Title : <br />
                <input type="text" required={true} value={title} onChange={(e) => settitle(e.target.value)} ></input>
                <br /> I want to keep it as
             <select className="control" onChange={(e) => { setType(e.target.value) }} value={type}>
                    <option key='00' value={true}>Public</option>
                    <option key='01' value={false}>Private</option>
                </select><br />
                Font Style: <select value={font} onChange={(e) => setFont(e.target.value)}>
                    <option key="Calligraffitti" value={`'Calligraffitti', cursive`}  >Calligraffitti</option>
                    <option key='Caveat' value={`'Caveat', cursive`}>Caveat</option>
                    <option key='Cedarville' value={`'Cedarville Cursive', cursive;`}>Cedarville Cursive</option>
                    <option key='Apple' value={`'Homemade Apple', cursive`}>Homemade Apple</option>
                </select>
                <textarea required={true} className="textarea" value={content} onChange={(e) => setContent(e.target.value)} rows="20"></textarea>
            </form>
        </div>
    )
}

export default Add;
