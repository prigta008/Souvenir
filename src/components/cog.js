import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { signout } from '../actions/userAction';
import '../App.css';

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
                if (res.isConfirmed) {
                    dispatch(signout(userInfo._id))
                }
                else {
                    return;
                }
            })
    }
    return (
        <div id="cog" style={color}>

            <button onClick={signouthandler}
                className="button is-warning is-outlined">
                Sign-Out
                  </button><hr />
        </div>
    )
}

export default Setting;