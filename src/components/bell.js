import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import '../App.css';
function Bell(props) {
    const user = useSelector(state=>state.user);
    const {userInfo} = user;
    useEffect(()=>{if(!userInfo){props.history.push("")}},[userInfo,props.history])
    const theme = useSelector(state=>state.theme);
    const {color}=theme; 
    return (
        <div id="bell" style={color}> 
            Under Construction 😥        
        </div>
    )
}

export default Bell;