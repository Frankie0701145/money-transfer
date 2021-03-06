import React, {Component} from "react";
import {
    Col, Row, Typography, Layout, Button, Space
} from "antd";
import logo from "../../images/money_transfer.png";
import "./DashboardHeader.css";
import  { LogoutOutlined  } from "@ant-design/icons";
import openedModals from "../../redux/actionCreators/opened_modals_action";
import logout from "../../redux/actionCreators/logout_action";
import { connect } from 'react-redux';

const {Title} = Typography;

class DashboardHeader extends Component {
    render(){
        return(
            <Row justify="center" id="header" align="middle">
                <Col xs={{span: 23}}>
                    <Row justify="space-between" align="middle">
                        <Col xs={{span: 3}}>
                            <span>
                                <img src={logo} id="homepage-logo"/>
                            </span>
                        </Col>

                        <Col>
                            <Row align="middle">
                                <Col>
                                    <Button type="link"
                                        onClick={()=>{this.props.openDepositModal()}}
                                    >
                                        <Title level={5} style={{color: "whitesmoke"}}>
                                            Deposit
                                        </Title>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button type="primary" 
                                        style={{
                                            backgroundColor: "green",
                                            borderColor: "green",
                                            borderRadius: "0.2em"
                                        }}
                                        onClick={()=>{this.props.openTransferModal()}}
                                    >
                                        <Title level={5} style={{color: "white"}}>
                                            Transfer
                                        </Title>
                                    </Button>
                                </Col>

                                <Col>
                                    <Button type="icon" style={{backgroundColor: "inherit",  borderColor: 'inherit'}}
                                        onClick={()=>this.props.logout()}
                                    >
                                        <LogoutOutlined  style={{fontSize: '1.6em', color: "white"}}/>
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {}
)

const mapDispatchToProps = (dispatch, ownProps)=>(
    {
        openDepositModal: ()=>{
            dispatch(openedModals({depositModal: true}));
        },
        openTransferModal: ()=>{
            dispatch(openedModals({transferModal: true}));
        },
        logout: ()=>{
            dispatch(logout());
        }
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);