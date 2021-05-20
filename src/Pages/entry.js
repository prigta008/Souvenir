import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import man from "../components/man.png";
import { useSelector } from 'react-redux';
function Entry(props) {
    const userInfo = localStorage.getItem("UserInfo");
    const theme = useSelector(state => state.theme), { color } = theme;
    useEffect(() => { if (userInfo) { props.history.push("/home") } }, [userInfo, props.history]);
    const reasonhandler = () => {
        Swal.fire({
            icon: "info",
            title: "Pros",
            html:
                `   I'll Able to Post Posts Publically <br/>
                   Likes, Comments On Posts<br/>
                  Night Mode<br/>
                  And much more...
                  `
        })
    }
    return (
        <div id="entry" className={`box ${color}`}>
            <img src={man} style={{ "padding": "0", "borderStyle": "solid", "borderRadius": "50%", "width": "50vw", "height": "50vw", "marginLeft": "20vw" }} className="image is-square" alt="man_img" />
            <br />
            <div className={`card ${color}`} style={{ "textAlign": "center" }}>
                <h1 className="card-title">
                    Hi There !
             </h1>
                <h2 className="card-subtitle">
                    Want to join<br /> Our Community ?
                  </h2>
                <div className="card-content">
                    <NavLink to="/signin">
                        <button className="button is-link is-rounded" >
                            Log-In
                        </button>
                    </NavLink>
                    <br />
                    <span>New User ?</span><br />
                    <NavLink to="/signup">
                        <button className="button is-link is-rounded">
                            Register Now
                         </button>
                    </NavLink>
                    <br />
                    <br/>
                    <span onClick={reasonhandler}>
                        Why should I Log-In/Register ?
                </span>
                </div>
            </div>
        </div>
    )
}

export default Entry;