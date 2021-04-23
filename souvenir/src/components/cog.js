import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../actions/userAction';


function Setting(props) {
    const user = useSelector(state=>state.user);
    const {userInfo} = user;
    if(!userInfo){props.history.push("/")};

    const dispatch = useDispatch();
    const signouthandler = () => {
        const query = window.confirm(`Are You Sure to Sign-Out ?`);
        if (query) {
            dispatch(signout());
            props.history.push("/");
        }
        else {
            return;
        }
    }
    return (
        <div>
             <button onClick={signouthandler} className="button is-warning is-rounded">Sign-Out</button><hr />
             </div>
    )
}

export default Setting;