import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { signout } from '../Redux/userAction';

function Setting(props) {
    const user = useSelector(state => state.user);
    const { userInfo } = user;
    const theme = useSelector(state => state.theme);
    const { color } = theme;
    useEffect(() => { if (!userInfo) { props.history.push("/") } }, [userInfo, props.history])
    const dispatch = useDispatch();
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
          <div  className={`card is-rounded ${color} is-outlined`}>
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