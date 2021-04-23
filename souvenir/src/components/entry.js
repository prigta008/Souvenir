import React, { useEffect } from 'react'; 
import {NavLink} from "react-router-dom";
import "../styles/phone_tab.css";
function Entry(props) {
   const userInfo = localStorage.getItem("UserInfo");
   useEffect(()=>{if(userInfo){props.history.push("/home")}},[userInfo,props.history])
    return (
        <div id="entry">
            Hi There !<br/>
    Want to join<br/> Our Community ? <br/>
    <NavLink to="/signin" className="button is-primary is-rounded" >Sign-In</NavLink><br/><br/>
    <NavLink to="/signup" className="button is-link is-rounded" >Sign-Up</NavLink>
     <br/><span id="small">Why should I Sign-In/Sign-Up ?</span> </div>
    )
}

export default Entry;
