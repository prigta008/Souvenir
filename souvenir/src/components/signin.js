import React, { useEffect, useState } from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { signin } from '../actions/userAction';
import {Error} from "./Error";
function Signin(props) {
    const [ email, setEmail] = useState("");
    const [ password, setPassword]  = useState("");
    const user = useSelector(state=>state.user);
    const {userInfo,error} = user;
    const dispatch = useDispatch();
    const submithandler=(e)=>{
        e.preventDefault();
        dispatch(signin(email,password));
    }
  useEffect(()=>{
    if(userInfo){
        props.history.push("/user");
    }
   },[userInfo,props.history]);
    return (
        <div id="signin">
            <NavLink to="/"><i id="back" className="fas fa-arrow-left"></i></NavLink><br />
         <h1>Sign-In</h1><br />
         <Error type="red">{error}</Error>
          <form method="POST" onSubmit={submithandler}>  Email Address : <br />
            <input required={true} type="email" value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }
                } ></input><br />
                Password :<br />
            <input required={true} type="password" value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }
                } ></input>
              <br/>  <button className="button is-success" type="submit">Submit  </button>
              </form>  </div>
    )
}
export default Signin;