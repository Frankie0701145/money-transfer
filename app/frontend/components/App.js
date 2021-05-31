import React from 'react';
import HomePage from "./HomePage/HomePage";
import {Switch, Route} from 'react-router-dom';
import "./App.css";
import 'antd/dist/antd.css';

const App = ()=>{
    return(
        <Switch>
            <Route exact path="/" component={HomePage}/>
        </Switch>
    )
}

export default App;