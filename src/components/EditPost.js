import React, { useEffect, useState } from 'react';
import { FormLabel, SmallLabelForLeft, SmallLabelForRight } from './formele';
import { useDispatch, useSelector } from 'react-redux';
import { editpostaction, postdet } from '../Redux/postActions';
import { NavLink } from 'react-router-dom';

function EditPost(props) {
    const id = props.match.params.id;
    const dispatch = useDispatch();
    useEffect(() => { dispatch(postdet(id)) }, [dispatch, id]);
    const det = useSelector(state => state.det), { data } = det;
    const theme = useSelector(state=>state.theme),{color} = theme;
    const [title, settitle] = useState(data?data.title:"");
    const [font, setFont] = useState(data?data.font:`'Calligraffitti', cursive`);
    const [content, setContent] = useState(data?data.content:"");
    const posthandler = (e) => {
        e.preventDefault();
        dispatch(editpostaction(id, title, font, content));
        setContent(""); setFont(`'Calligraffitti', cursive`); settitle("");
    }
    return (
 <>  { data?    <section className={`box ${color}`} id="add" >
           <NavLink to="/user"><i className="fas fa-chevron-left"></i></NavLink>
           
            <h1 className="h1">Edit Post </h1>
            <form method="POST" autoComplete="on" onSubmit={posthandler}>
                <button type="submit" className="button is-success" >Done</button>
                <hr />
                <FormLabel labelfor="title" label="Title" />
                <div className="control has-icons-left has-icons-right">
                    <input autoFocus={true} type="text" name="title" className="input is-primary" value={title} onChange={(e) => settitle(e.target.value)} required={true} />
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
                <textarea required={true} className="textarea is-primary" value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="20" ></textarea>
            </form>
        </section>
  :"" }</> )
}

export default EditPost;
