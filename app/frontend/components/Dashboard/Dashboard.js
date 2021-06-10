import React, {Component} from "react";
import { Switch, Route } from 'react-router-dom';
import DashboardHeader from "../Layout/DashboardHeader";
import AccountOverView from "./AccountOverview/AccountOverview";
import {Layout} from "antd";
import DepositModal from "../Layout/Modals/DepositModal";
import TransferModal from "../Layout/Modals/TransferModal";
import { connect } from 'react-redux';


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
                <TransferModal/>
            </Layout>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        visible:  state.openedModals.depositModal? state.openedModals.depositModal: false,
        requesting: state.requesting,
        userDetails: state.userDetails
    }
)
const mapDispatchToProps = (dispatch, ownProps)=>(
    {
        closeModal: ()=>{
            dispatch(openedModals({depositModal: false}));
        },
        deposit: (values)=>{
            dispatch(deposit(values));
        }
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);