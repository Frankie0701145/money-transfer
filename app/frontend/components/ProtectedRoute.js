import {Redirect, Route} from "react-router-dom";
import Cookies from 'js-cookie';
import React from "react";


const ProtectedRoute = ({Component, path})=>{
    let auth_token = Cookies.get("auth_token");
    let loggedIn = auth_token !== undefined;
    return (
        < Route
            path={path}
            render = { props =>{
                return loggedIn ? <Component {...props}/> : <Redirect to="/"/>;
            }}
        />
    )
    
}

export default ProtectedRoute;