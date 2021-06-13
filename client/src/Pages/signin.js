import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from '../Redux/userAction';
import { Error } from "../components/Error";
import { FormLabel, LastButton, SmallLabelForLeft, SmallLabelForRight } from '../components/formele';

function Signin(props) {
    const user = useSelector(state => state.user), { userInfo, error } = user,theme = useSelector(state => state.theme), { color } = theme;
    useEffect(() => { if (userInfo) { props.history.push("/") } }, [userInfo, props.history]);
    const [email, setEmail] = useState(""),[password, setPassword] = useState(""),[dis, setdis] = useState(false),dispatch = useDispatch(),
    submithandler = (e) => {setdis(true); e.preventDefault(); dispatch(signin(email, password)); setdis(false);}
    return (
        <div className="fgh">
            <section id="signin">
                <form method="POST" onSubmit={submithandler} onReset={() => { setEmail(""); setPassword("") }} autoComplete="off" className={`card box ${color}`}>
                    <header className={`card-header ${color}`}>
                        <NavLink activeClassName={`card-header-icon ${color}`} to="/">
                            <span className="icon"><i className="fas fa-chevron-left" ></i></span>
                        </NavLink>
                        <p className={`card-header-title is-centered ${color}`}>Log-In</p>
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
                            <Error>{error}</Error>New Here ?  <NavLink to="/signup">Register Now</NavLink>
                        </p>
                    </div>
                </form>
            </section>
        </div>
    )
}
export default Signin;