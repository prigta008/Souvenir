import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { signout } from '../Redux/userAction';
import { NavLink } from "react-router-dom";

function Setting(props) {
    const user = useSelector(state => state.user);
    const { userInfo } = user;
    const theme = useSelector(state => state.theme);
    const { color } = theme;
    useEffect(() => { if (!userInfo) { props.history.push("/") } }, [userInfo, props.history])
    const dispatch = useDispatch();
    var i = localStorage.getItem("info") ? localStorage.getItem("info").toString() : "true",
        s = localStorage.getItem("success") ? localStorage.getItem("success").toString() : "true"
        , e = localStorage.getItem("error") ? localStorage.getItem("error").toString() : "true"
        , w = localStorage.getItem("warning") ? localStorage.getItem("warning").toString() : "true"
    const signouthandler = () => {
        Swal.fire({
            title: "Confirmation", icon: "warning",
            html: "Are You Sure To Log Out", showDenyButton: true,
            confirmButtonText: "Yes, I'm Sure", denyButtonText: "No",
            denyButtonColor: "#2778c4", confirmButtonColor: "red"
        })
            .then((res) => {
                if (res.isConfirmed) { dispatch(signout(userInfo._id)) }
                else { return; }
            })
    }
    return (
        <div id="cog" className={`${color}`}>
            <div className={`card ${color}`}>
                <div className={`card-header ${color} has-text-centered`}>
                    <div className={`card-header-title is-centered ${color}`}>Preferences</div>
                </div>
                <div className={`card-content ${color}`}>
                    Recommended Action Is To Get Alerts<hr className="my-2" />
                    <div className="cog-tb"> Info Alerts</div>
                    <label className="switch">
                        <input type="checkbox" defaultChecked={i === "true" ? true : false}
                            onClick={() => { localStorage.setItem("info", i === "true" ? "false" : "true"); i === "true" ? i = "false" : i = "true" }} />
                        <span className="slider round"></span>
                    </label>
                    <hr className="my-2" />
                    <div className="cog-tb"> Success Alerts</div>
                    <label className="switch">
                        <input type="checkbox" defaultChecked={s === "true" ? true : false}
                            onClick={() => { localStorage.setItem("success", s === "true" ? "false" : "true"); s === "true" ? s = "false" : s = "true" }} />
                        <span className="slider round"></span>
                    </label>
                    <hr className="my-2" />
                    <div className="cog-tb">Error Alerts</div>
                    <label className="switch">
                        <input type="checkbox" defaultChecked={e === "true" ? true : false}
                            onClick={() => { localStorage.setItem("error", e === "true" ? "false" : "true"); e === "true" ? e = "false" : e = "true" }} />
                        <span className="slider round"></span>
                    </label>
                    <hr className="my-2" />
                    <div className="cog-tb"> Warning Alerts</div>
                    <label className="switch">
                        <input type="checkbox" defaultChecked={w === "true" ? true : false}
                            onClick={() => { localStorage.setItem("warning", w === "true" ? "false" : "true"); w === "true" ? w = "false" : w = "true" }} />
                        <span className="slider round"></span>
                    </label>
                    <hr className="my-2" />
                </div>
            </div>
            <br />
            <div className={`card box ${color}`}>
                <div className={`card-header ${color} is-centered`}>
                    <div className={`card-header-title ${color} is-centered`}>App Version {"&"} Docs </div></div>
                <div className={`card-content ${color}`}>
                   <p style={{"color": "#485fc7"}} 
                   onClick={()=>Swal.fire({icon:"info",html:"1. App supports Inline Equations also"})}>
                     Current App Version :0.3.1</p><hr className='my-2' />
                    <p style={{ "color": "#485fc7" }}
                        onClick={() => Swal.fire({ icon: "info", html: "1. Stable Font Family for whole App" }).then(() => Swal.fire({ icon: "info", html: "2. Support for Mathematical Equations and some bug fixes" }))} >
                         App Version : 0.3.0 </p><hr className='my-2' />
                    <p style={{ "color": "#485fc7" }}
                        onClick={() => Swal.fire({ icon: "info", html: "1. Color change of Entry Screen Button & font change of whole App" })
                            .then(() => Swal.fire({ icon: "info", html: "2. Layout Change of Post Details page And color change of footer icons<br/> and much more..." }))}>
                        App Version : 0.2.0 beta</p><hr className="my-2" />
                    <p style={{ "color": "#485fc7" }}
                        onClick={() => Swal.fire({ icon: "info", html: "Fully Deployed App , Everything was new" })}>
                        App Version : 0.1.0 beta</p><hr className="my-2" />
                </div>
                <div className={`card-footer my-1 ${color}`}>
                    <NavLink to="/about"><p style={{ "color": "#485fc7" }}>Understand The App Structure</p></NavLink>
                </div>
            </div>
            <br />
            <div className={`card is-rounded ${color} is-outlined`}>
                <div className="card-header is-centered">
                    <div className="card-header-title has-text-danger is-centered">
                        Danger Zone
                        </div>
                </div>
                <div className="card-content">
                    <button onClick={signouthandler}
                        className="button is-danger is-outlined">
                        Sign-Out
                  </button>
                </div>
            </div>
        </div>
    )
}

export default Setting;