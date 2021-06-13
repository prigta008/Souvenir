import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'; 
function Bell(props) {
    const user = useSelector(state=>state.user), {userInfo} = user;
    useEffect(()=>{if(!userInfo){props.history.push("/")}},[userInfo,props.history])
    const theme = useSelector(state=>state.theme),{color}=theme; 
    return (
        <div id="bell" className={`${color}`}> 
            Under Construction 😥        
        </div>
    )
}

export default Bell;