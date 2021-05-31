import {Redirect, Route} from "react-router-dom";
import React from "react";

const ProtectedRoute = ({component: Comp, loggedIn, path})=>{
    console.log(loggedIn);
    return (
        < Route
            path={path}
            render = { props =>{
                return loggedIn ? <Comp {...props}/> : <Redirect to="/"/>;
            }}
        />
    )
    
}

export default ProtectedRoute;