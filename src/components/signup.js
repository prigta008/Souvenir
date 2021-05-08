import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from '../actions/userAction';
import { Error } from "./Error"; 
import imageCompression from 'browser-image-compression';

function Signup(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setname] = useState("");
    const [age, setage] = useState(0);
    const [dis, setdis] = useState(false);
    const [img, setimg] = useState("");
    const newuser = useSelector(state => state.newuser);
    const { userInfo, error } = newuser;
    const dispatch = useDispatch();
    const imghandler = async (e) => {
        let image = e.target.files[0];
        let option = {
            maxsizeMB: 0.004296875,
            maxWidthOrHeight: 300,
            maxIteration: 40
        }
        let compressed = await imageCompression(image, option);
        let reader = new FileReader();
        reader.readAsDataURL(compressed);
        reader.addEventListener("load", () => {
            setimg(reader.result)
        });
    }
    const submithandler = (e) => {
        e.preventDefault();
        setdis(true);
        const time = new Date();
        dispatch(signup(email, password, username, age, time, img));
        setdis(false);
    }
    useEffect(() => {
        if (userInfo) { setTimeout(function () { props.history.push("/user") }, 2000); }
    }, [userInfo, props.history]);
    return (
        <section id="signin">
            <form method="POST" onSubmit={submithandler} onReset={() => { setEmail(""); setPassword(""); setage(0); setname(""); }} autoComplete="off" className="card box">
                <header className="card-header">
                    <NavLink activeClassName="card-header-icon" to="/" >
                        <span className="icon">
                            <i className="fas fa-chevron-left"></i>
                        </span>
                    </NavLink>
                    <p className="card-header-title is-centered">
                        Register
                </p>
                </header>
                <label className="label" htmlFor="name">Username</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-primary" name="name" type="text" required={true} value={username}
                        onChange={(e) => { setname(e.target.value) }} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>

                <label className="label" htmlFor="email"> Email Address</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-primary" name="email" type="email" required={true} value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>


                <label className="label" htmlFor="password">Password</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-primary" name="password" type="password" required={true} value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>

                <label className="label" htmlFor="age">Age</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-primary" name="age" type="tel" required={true} value={age}
                        onChange={(e) => { setage(e.target.value) }} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </div>

                <label className="label" htmlFor="pic">Profile Image</label>
                <div className="file">
                    <label className="file-label">
                        <input className="file-input" type="file" name="pic" required={true}
                            accept="image/*" onChange={imghandler} multiple={false} />
                        <span className="file-cta">
                            <span className="file-icon">
                                <i className='fas fa-upload'></i>
                            </span>
                            <span className="file-label">
                                choose a file...
                            </span>
                        </span>
                    </label>
                </div>
                <br />
                <div className="field is-grouped is-grouped-centered">
                    <button className="button control is-success" type="submit" disabled={dis}>
                        Submit
                   </button>
                    <button type="reset" className="button control is-success is-light">
                        Clear
                        </button>
                </div>
                <div className="card-footer is-centered">
                    <p className="card-footer-item is-centered is-small">
                        <Error type="red">{error}</Error>
                        <hr />
                        Already Have an Account ?  <NavLink to="/signin">Log-In</NavLink>
                    </p>
                </div>
            </form>
        </section>
    )
}
export default Signup;