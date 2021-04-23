import React, { useEffect, useState } from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { signup } from '../actions/userAction';
import {Error} from "./Error";
function Signup(props) {
    const [ email, setEmail] = useState("");
    const [ password, setPassword]  = useState("");
    const [username,setname ] = useState("");
    const [age,setage] = useState(0);
    const newuser = useSelector(state=>state.newuser);
    const {userInfo,error} = newuser;
    const dispatch = useDispatch();
    const submithandler=(e)=>{
        e.preventDefault();
        const time = new Date();
        dispatch(signup(email,password, username,age,time));
    }
  useEffect(()=>{
    if(userInfo){
        props.history.push("/user");
    }
   },[userInfo,props.history]);
    return (
        <div id="signup">
            
            <NavLink to="/"><i id="back" className="fas fa-arrow-left"></i></NavLink><br />
         <h1>Sign-Up</h1><br />
         <Error type="red">{error}</Error>
          <form method="POST" onSubmit={submithandler}> 
          Username : <br/>
          <input type="text" required={true} value={username}
           onChange={
               (e)=>{setname(e.target.value)}
               } ></input>
               <br/>
           Email Address : <br />
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
              <br/>
              Age :<br/> <input type="number" required={true} value={age}
               onChange={
                   (e)=>{setage(e.target.value)}
                   }></input><br/>
                <button className="button is-success" type="submit">Submit  </button>
              </form>  </div>
    )
}
export default Signup;