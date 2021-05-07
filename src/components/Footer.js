import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import '../App.css';
function Footer() {
    const user = useSelector(state => state.user), { userInfo } = user;
    return (
        <div>
            {
                userInfo
                    ? (<nav className="tabs is-fullwidth">
                        <div className="container is-fullwidth">
                            <ul>
                                <li>
                                    <NavLink activeClassName="active" to="/home">
                                        <i className="fas fa-home"></i>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName="active" to="/user" >
                                        <i className="fas fa-user"></i>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName="active" to="/add"  >
                                        <i className="fas fa-plus-circle"></i>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName="active" to="/bell"  >
                                        <i className="fas fa-bell"></i>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName="active" to="/cog"  >
                                        <i className="fas fa-cog"></i>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    )
                    : <></>
            }
        </div>)
}

export default Footer;
