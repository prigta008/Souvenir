import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import logo from "../images/60.png";
import { themechanger } from '../Redux/userAction';
import { NavLink } from "react-router-dom";
export const Header=()=> {
  const theme = useSelector(state => state.theme);
  const { color } = theme;
  const dispatch = useDispatch();
  const themehandler = () => {
    dispatch(themechanger(color));
  }
  return (
    <div className={`fielld has-adons ${color}`}>
      <div className="contro is-expand h-i-l">
        <span className="ic i-l">
          <img src={logo} alt="profile" />
        </span>
        <div className={`inp ${color}`}>Souvenir</div>
      </div>
      <div className="contro">
        <button onClick={themehandler} className={`button ${color}`}>
          Theme
          </button>
      </div>
    </div>
  )
}
export const Footer =()=> {
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