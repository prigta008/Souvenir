import React  from 'react';
import { useDispatch, useSelector } from "react-redux";
import logo from "./android-launchericon-48-48.png";
import '../App.css';
import { themechanger } from '../actions/userAction';
function Header() {
    const theme = useSelector(state => state.theme);
    const { color, data} = theme;
    const dispatch = useDispatch();
    const themehandler = () => {
        dispatch(themechanger(data));
    }
    return (
        <div style={color} className="field has-addons">
        <div className="control is-expanded has-icons-left">
            <span className="icon is-small is-left">
                <img src={logo} alt="profile"/>
            </span>
          <input className="input" type="text" value="  Souvenir" readOnly={true}/>
        </div>
        <div className="control">
          <button onClick={themehandler} className="button is-info">
            Theme
          </button>
        </div>
      </div>
    )
}

export default Header;
