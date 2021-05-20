import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
function Footer() {
    const user = useSelector(state => state.user), { userInfo } = user;
    const theme = useSelector(state => state.theme), { color } = theme;
    return (
        <div className={`${color}`}>
            { userInfo ? (<div className="foot">
                <div>
                    <NavLink activeClassName="active" to="/home">
                        <i className="fas fa-home"></i>
                        <p className="help is-small">Home</p>
                    </NavLink>
                </div>
                <div>
                    <NavLink activeClassName="active" to="/user" >
                        <i className="fas fa-user"></i>
                        <p className="help is-small">User</p>
                    </NavLink>
                </div>
                <div>
                    <NavLink activeClassName="active" to="/add"  >
                        <i className="fas fa-plus-circle"></i>
                        <p className="help is-small">New</p>
                    </NavLink>
                </div>
                <div>
                    <NavLink activeClassName="active" to="/bell"  >
                        <i className="fas fa-bell"></i>
                        <p className="help is-small">Alerts</p>
                    </NavLink>
                </div>
                <div>
                    <NavLink activeClassName="active" to="/cog"  >
                        <i className="fas fa-cog"></i>
                        <p className="help is-small">Settings</p>
                    </NavLink>
                </div>
            </div>
            ) : <></>
            }
        </div>)
}

export default Footer;
