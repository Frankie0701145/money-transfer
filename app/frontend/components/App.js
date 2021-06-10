import React, {useEffect} from 'react';
import HomePage from "./HomePage/HomePage";
import {Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import "./App.css";
import 'antd/dist/antd.css';
import Dashboard from "./Dashboard/Dashboard";
import fetchUser from "../redux/actionCreators/fetch_user_details_actions";
import ProtectedRoute from "./ProtectedRoute";
import Cookies from 'js-cookie';
import loginSuccess from "../redux/actionCreators/login_success_action";
import { withRouter } from "react-router";

const App = (props)=>{
    
    useEffect(()=>{
        let auth_token = Cookies.get("auth_token");
        let authTokenPresent = auth_token !== undefined;
        // if the auth_token is present and login is false
        if(authTokenPresent && !props.signedIn){
            props.fetchUser();
            props.loginSuccess();
        }
    });

    return(
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <ProtectedRoute path="/dashboard" Component={Dashboard}/>
        </Switch>
    )
}

const mapStateToProps = (state, ownProps)=>{
    return {
        signedIn: state.signedIn
    }
}

const mapDispatchToProps = (dispatch, ownProps)=>{
    return {
        fetchUser: ()=>{
            dispatch(fetchUser())
        },
        loginSuccess: ()=>{
            dispatch(loginSuccess())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));