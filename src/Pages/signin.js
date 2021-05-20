import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from '../Redux/userAction';
import { Error } from "../components/Error";
import { FormLabel, LastButton, SmallLabelForLeft, SmallLabelForRight } from '../components/formele';

function Signin(props) {
    const user = useSelector(state => state.user);
    const { userInfo, error } = user;
    const theme = useSelector(state=>state.theme),{color}=theme;
    useEffect(() => {
        if (userInfo) { setTimeout(function () { props.history.push("/user") }, 2000); }
    }, [userInfo, props.history]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dis, setdis] = useState(false);
    const dispatch = useDispatch();
    const submithandler = (e) => {
        setdis(true);
        e.preventDefault(); if (password !== "" && email !== "") { dispatch(signin(email, password)); }
        setdis(false);
    }
    return (
        <section id="signin">
            <form method="POST" onSubmit={submithandler}
             onReset={() => { setEmail(""); setPassword("") }} autoComplete="off" className={`card box ${color}`}>
                <header className={`card-header ${color}`}>
                    <NavLink activeClassName={`card-header-icon ${color}`} to="/">
                        <span className="icon">
                            <i className="fas fa-chevron-left" ></i>
                        </span>
                    </NavLink>
                    <p className={`card-header-title is-centered ${color}`}>
                        Log-In
                </p>
                </header>
                <FormLabel labelfor="email" label="Email-Address" />
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-primary" name="email" type="email" required={true} value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />
                    <SmallLabelForLeft icon="fas fa-envelope" />
                    <SmallLabelForRight icon="fas fa-check" />
                </div>

                <FormLabel labelfor="password" label="Password" />
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-primary" name="password" type="password" required={true} value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />
                    <SmallLabelForLeft icon="fas fa-lock" />
                    <SmallLabelForRight icon="fas fa-check" />
                </div>

                <br />
                <LastButton dis={dis} />
                <div className="card-footer is-centered">
                    <p className="card-footer-item is-centered is-small">
                        <Error type="red">{error}</Error>      
                        New Here ?  <NavLink to="/signup">Register Now</NavLink>
                    </p>
                </div>
            </form>
        </section>
    )
}
export default Signin;