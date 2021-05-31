import React, {useEffect} from 'react';
import HomePage from "./HomePage/HomePage";
import {Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import "./App.css";
import 'antd/dist/antd.css';
import Dashboard from "./Dashboard/Dashboard";
import Cookies from 'js-cookie';
import fetchUser from "../redux/actionCreators/fetch_user_details_actions";

const App = (props)=>{
    let auth_token = Cookies.get("auth_token");
    let loggedIn = auth_token !== undefined;

    useEffect(()=>{
        // if loggedIn is true and redux signedIn state is false change the signedIn redux state to true
        if(loggedIn && !props.signedIn){
            props.fetchUser();
        }
    });

    return(
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/dashboard" component={Dashboard}/>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);