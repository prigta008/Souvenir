import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import man from "../images/man.png";
import { useSelector } from 'react-redux';
function Entry(props) {
    const userInfo = localStorage.getItem("UserInfo");
    const theme = useSelector(state => state.theme), { color } = theme;
    useEffect(() => { if (userInfo) { props.history.push("/home") } }, [userInfo, props.history]);
    const reasonhandler = () => {
        Swal.fire({icon: "info",title: "Pros",html:`I'll Able to Post Posts Publically & Privately<br/>Likes, Comments On Posts<br/>Night Mode<br/>And much more...`
        })
    }
    return (
       <div className="fgh">
            <div id="entry" className={`box ${color}`}>
            <img aria-hidden="true"  src={man} style={{ "borderStyle": "solid", "borderRadius": "50%", "width": "50vw", "height": "50vw", "marginLeft": "20vw" }}
             className="image is-square p-0 is-unselectable" alt="man_img" />
            <br />
            <div className={`card ${color}`} style={{ "textAlign": "center" }}>
                <p className="card-title is-size-4">
                    Hi There !
             </p>
                <p className="card-subtitle is-size-5">
                    Want to join<br /> Our Community ?
                  </p>
                <div className="card-content">
                    <NavLink to="/signin">
                        <button className="button is-purple is-rounded" >
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
                    <span onClick={reasonhandler} className="has-text-info">
                        Why should I Log-In/Register ?
                </span>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Entry;