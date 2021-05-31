import React, {useEffect} from 'react';
import HomePage from "./HomePage/HomePage";
import {Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import "./App.css";
import 'antd/dist/antd.css';
import Dashboard from "./Dashboard/Dashboard";
import Cookies from 'js-cookie';
import fetchUser from "../redux/actionCreators/fetch_user_details_actions";
import ProtectedRoute from "./ProtectedRoute";
import loginSuccess from "../redux/actionCreators/login_success_action";

const App = (props)=>{
    let auth_token = Cookies.get("auth_token");

    useEffect(()=>{
        
        let loggedIn = auth_token !== undefined;
        // if loggedIn is true and redux signedIn state is false change the signedIn redux state to true
        if(loggedIn){
            props.fetchUser();
            props.loginSuccess();
        }
    });

    return(
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <ProtectedRoute loggedIn={auth_token !== undefined} path="/dashboard" component={Dashboard}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);