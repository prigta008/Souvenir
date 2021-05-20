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
    const data = new Date();
    const [content, setContent] = useState(`${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`);
    const [font, setFont] = useState(`'Calligraffitti', cursive`);
    const dispatch = useDispatch();
    const posthandler = (e) => {
        e.preventDefault();
        dispatch(addpost(title, content, font, userInfo.username, userInfo._id));
        setContent(`${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`);
        settitle(""); setFont(`'Calligraffitti', cursive`);
    }
    return (
        <section className={`box ${color}`} id="add">
            <form method="POST" autoComplete="on" onSubmit={posthandler} className={`card box ${color}`}>
               <div className={`card-header ${color}`}>
                  <div className="card-header-title">
                      New Souvenir
                 <span className="icon"><button type="submit" className="button is-success" >Post</button></span>  
                  </div>
               </div>
                <FormLabel labelfor="title" label="Title" />
                <div className="control has-icons-left has-icons-right">
                    <input type="text" name="title" className="input is-primary" value={title} onChange={(e) => settitle(e.target.value)} required={true} />
                    <SmallLabelForLeft icon="fas fa-heading" />
                    <SmallLabelForRight icon="fas fa-check" />
                </div>
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
                <textarea autoFocus={false} required={true} className={`textarea is-primary ${color}`} value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="20" ></textarea>
            </form>
        </section>
    )
}

export default Add;