import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import logo from "../images/60.png";
import { themechanger } from '../Redux/userAction';
import { NavLink } from "react-router-dom";
import { pageAction } from '../Redux/commentAction';
export const Header = () => {
    const theme = useSelector(state => state.theme), { color } = theme, dispatch = useDispatch(),
        themehandler = () => {
            dispatch(themechanger(color));
        }
    return (<div className={`fielld has-adons ${color}`} >
        <div className="contro is-expand h-i-l" >
            <span className="ic i-l" >
                <img src={logo} alt="profile" />
            </span>
            <div className={`inp ${color}`} > Souvenir </div>
        </div>
        <div className="contro" >
            <button onClick={themehandler}
                className={`button ${color}`} >
                Theme </button> </div> </div>
    )
}
export const Footer = () => {
    const user = useSelector(state => state.user), { userInfo } = user, dispatch = useDispatch(), theme = useSelector(state => state.theme), { color } = theme, p = useSelector(state => state.page), { page } = p;
    return (
        <div className={`${color}`} >
            {userInfo ? (
                <div className="foot" >
                    <div>
                        <NavLink activeClassName="active" to="/home" onClick={() => dispatch(pageAction("HOME"))} >
                            <i className="fas fa-home" style={{ "color": page === "home" ? "#485fc7" : "grey" }} aria-hidden='true' > </i>
                            <p style={{ "color": page === "home" ? "#485fc7" : "grey" }} className="help is-small" > Home </p>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName="active" to="/user" onClick={() => dispatch(pageAction("USER"))} >
                            <i style={{ "color": page === "user" ? "#485fc7" : "grey" }} className="fas fa-user" aria-hidden="true" > </i>
                            <p style={{ "color": page === "user" ? "#485fc7" : "grey" }} className="help is-small" > User </p>
                        </NavLink>
                    </div>
                    <div >
                        <NavLink activeClassName="active" to="/add" onClick={() => dispatch(pageAction("ADD"))} >
                            <i style={{ "color": page === "add" ? "#485fc7" : "grey" }} className="fas fa-plus-circle" aria-hidden="true" > </i>
                            <p style={{ "color": page === "add" ? "#485fc7" : "grey" }} className="help is-small" > New </p>
                        </NavLink>
                    </div>
                    <div >
                        <NavLink activeClassName="active" to="/bell" onClick={() => dispatch(pageAction("BELL"))} >
                            <i style={{ "color": page === "bell" ? "#485fc7" : "grey" }} className="fas fa-bell" aria-hidden="true" > </i>
                            <p style={{ "color": page === "bell" ? "#485fc7" : "grey" }} className="help is-small" > Alerts </p>
                        </NavLink>
                    </div>
                    <div >
                        <NavLink activeClassName="active" to="/cog" onClick={() => dispatch(pageAction("COG"))} >
                            <i style={{ "color": page === "cog" ? "#485fc7" : "grey" }} className="fas fa-cog" aria-hidden="true"> </i>
                            <p style={{ "color": page === "cog" ? "#485fc7" : "grey" }} className="help is-small"> Settings </p>
                        </NavLink>
                    </div>
                </div>
            ) : <> </>} </div>)
}