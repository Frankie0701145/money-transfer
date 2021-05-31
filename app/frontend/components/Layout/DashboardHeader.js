import React, {Component} from "react";
import {
    Col, Row, Typography, Layout, Button, Space
} from "antd";
import logo from "../../images/money_transfer.png";
import "./DashboardHeader.css";
// import { Switch, Route, NavLink } from 'react-router-dom';

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
                                        onClick={()=>{}}
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
                                        onClick={()=>{}}
                                    >
                                        <Title level={5} style={{color: "white"}}>
                                            Transfer
                                        </Title>
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

export default DashboardHeader;