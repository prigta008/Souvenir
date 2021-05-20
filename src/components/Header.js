import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import logo from "./60.png";
import { themechanger } from '../Redux/userAction';
function Header() {
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

export default Header;
