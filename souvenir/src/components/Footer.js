import React from 'react'; 
import { NavLink } from "react-router-dom";

import "../styles/phone_tab.css";
function Footer() {
    
    return (
        
             
                   <div>
                    <div id="footer">
                        <NavLink activeClassName="active" to="/home"><i className="fas fa-home"></i></NavLink>
                        <NavLink activeClassName="active" to="/user" ><i className="fas fa-user"></i></NavLink>
                        <NavLink activeClassName="active" to="/add"  ><i className="fas fa-plus-circle"></i></NavLink>
                        <NavLink activeClassName="active" to="/bell"  ><i className="fas fa-bell"></i></NavLink>
                        <NavLink activeClassName="active" to="/cog"  ><i className="fas fa-cog"></i></NavLink>
                    </div>
                </div>  
            
        
    )
}

export default Footer;
