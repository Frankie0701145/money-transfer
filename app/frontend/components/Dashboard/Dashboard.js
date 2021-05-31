import React, {Component} from "react";
import { Switch, Route } from 'react-router-dom';
import DashboardHeader from "../Layout/DashboardHeader";
import AccountOverView from "./AccountOverview/AccountOverview";
import {Layout} from "antd";
import DepositModal from "../Layout/Modals/DepositModal"


class Dashboard extends Component {
    render(){
        return(
            <Layout style={{height: "100vh"}}>
                <DashboardHeader/>
                <Switch>
                    <Route exact path="/dashboard" component={AccountOverView}/>
                </Switch>
                {/* Modals */}
                <DepositModal />
            </Layout>
        )
    }
}

export default Dashboard;