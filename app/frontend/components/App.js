import React from 'react';
import HomePage from "./HomePage/HomePage";
import {Switch, Route} from 'react-router-dom';
import "./App.css";
import 'antd/dist/antd.css';
import Dashboard from "./Dashboard/Dashboard";

const App = ()=>{
    return(
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/dashboard" component={Dashboard}/>
        </Switch>
    )
}

export default App;