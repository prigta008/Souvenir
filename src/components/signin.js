import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from '../actions/userAction';
import { Error } from "./Error";
import '../App.css';
function Signin(props) {
    const user = useSelector(state => state.user);
    const { userInfo, error } = user;
    useEffect(() => {
        if (userInfo) { setTimeout(function () { props.history.push("/user") }, 2000); }
    }, [userInfo, props.history]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dis, setdis] = useState(false);
    const dispatch = useDispatch();
    const submithandler = (e) => {
        setdis(true);
        e.preventDefault(); dispatch(signin(email, password));
        setdis(false);
    }
    return (
        <section id="signin">
            <form method="POST" onSubmit={submithandler} onReset={() => { setEmail(""); setPassword("") }} autoComplete="off" className="card box">
                <header className="card-header">
                    <NavLink activeClassName="card-header-icon" to="/">
                        <span className="icon">
                            <i className="fas fa-chevron-left" ></i>
                        </span>
                    </NavLink>
                    <p className="card-header-title is-centered">
                        Log-In
                </p>
                </header>
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
                <br />
                <div className="field is-grouped is-grouped-centered">
                    <button className="button control is-success" type="submit" disabled={dis}>
                        Submit
                   </button>
                    <button type="reset" className="button control is-success is-light">Clear</button>
                </div>
                <div className="card-footer is-centered">
                    <p className="card-footer-item is-centered is-small">
                        <Error type="red">{error}</Error>
                        <hr/>
                        New Here ?  <NavLink to="/signup">Register Now</NavLink>
                    </p>
                </div>
            </form>
        </section>
    )
}
export default Signin;