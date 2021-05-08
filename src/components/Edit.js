import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateuser } from '../actions/userAction';
import FileBase64 from "react-file-base64";
function Edit(props) {
    const user = useSelector(state => state.user);
    const theme = useSelector(state => state.theme);
    const { color } = theme;
    const { userInfo } = user;
    useEffect(() => {
        if (!userInfo) { props.history.push("/") }
    }, [userInfo, props.history]);
    const dispatch = useDispatch();
    const [password, setPassword] = useState(userInfo.password ? userInfo.password : "");
    const [username, setname] = useState(userInfo.username ? userInfo.username : "");
    const [age, setage] = useState(userInfo.age ? userInfo.age : 0);
    const [desc, setdesc] = useState(userInfo.description ? userInfo.description : "");
    const [file, setFile] = useState(userInfo.img ? userInfo.img : undefined);
    const [dis, setdis] = useState(false);
    const submithandler = (e) => {
        e.preventDefault();
        setdis(true)
        dispatch(updateuser(userInfo._id, username, desc, age, password, file));
        setdis(false);
    }
    return (
        <div id="form" style={color} >
            <form method="POST" className="box" autoComplete="off" onSubmit={submithandler}>
                <label className="label" htmlFor="name"> Username</label>
                
                <input className="input is-primary" name="name" required={true} type="text" value={username}
                    onChange={(e) => { setname(e.target.value) }} />
                
                <label className="label" htmlFor="password"> New Password</label>
                
                <input className="input is-primary" name="password" required={true} type="password" value={password}
                    onChange={(e) => { setPassword(e.target.value) }} />
                
                <label className="label" htmlFor="age">Age</label>
                
                <input className="input is-primary" name="age" required={true} type="number" value={age}
                    onChange={(e) => { setage(e.target.value) }} />
                
                <label className="label" htmlFor="about">About</label>
                 
                <input name="about" className="input is-primary" required={true} type="text" value={desc}
                    onChange={(e) => { setdesc(e.target.value) }} />
                 
                                Profile Pic <br />
                <FileBase64 type="file" value={file} multiple={false} onDone={({ base64 }) => { setFile(base64) }} />
                
               Preview
               <br />
                <img width="30vw" height="30vw" style={{ "borderRadius": "50%" }} src={file} alt="profile" />
                <br />
                <button type="submit" disabled={dis} className="button is-success">Submit</button>
            </form>
        </div>

    )
}

export default Edit
