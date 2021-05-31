import React, {Component} from "react";
import {
    Col, Row, Typography, Layout, Button, Space
} from "antd";
import logo from "../../images/money_transfer.png";
import {ArrowRightOutlined} from "@ant-design/icons";
import LoginModal from "../Layout/Modals/LoginModal";
import { connect } from 'react-redux';
import openedModals from "../../redux/actionCreators/opened_modals_action";

import "./HomePage.css";



const {Title, Paragraph} = Typography;
const { Header, Content, Footer, Sider } = Layout;

/**
 * This is the HomePage
 * @component
 * @example
 * return(
 *      <HomePage/>
 * )
 */
class HomePage extends Component {
    render(){
        return(
            <Layout style={{height: "100vh"}}>
                
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
                                            onClick={()=>(this.props.openLoginModal())}
                                        >
                                            <Title level={5} style={{color: "whitesmoke"}}>
                                                Sign in
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
                                        
                                        >
                                            <Title level={5} style={{color: "white"}}>
                                                Get Started
                                            </Title>
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
                
                <Row justify="center" style={{marginTop: "6em"}} id="content" >

                    <Col xs={{span: 20}}>

                        <Row align="middle">
                            
                            <Col xs={{span: 24}} md={{span:12}}>
                                <Button type="link">
                                    <Space>
                                        <span> Get Started </span>
                                        <ArrowRightOutlined />
                                    </Space>
                                    
                                </Button>
                                <Paragraph style={{fontSize: "2em"}}>
                                    Get Started <br/> with the Best <br/> reliable money transfer
                                </Paragraph>
                                <Button type="primary" 
                                    style={{
                                        backgroundColor: "green",
                                        borderColor: "green",
                                        borderRadius: "0.2em"
                                    }}
                                
                                >
                                    <Title level={5} style={{color: "white"}}>
                                        Get Started
                                    </Title>
                                </Button>

                                <Button type="link"
                                    onClick={()=>(this.props.openLoginModal())}
                                >
                                    <Title level={5} style={{color: "green"}}>
                                        Sign in
                                    </Title>
                                </Button>

                            </Col>

                            <Col xs={{span: 0}} md={{span:12}} id="money-transfer-illustrator">
                            
                            </Col>

                        </Row>
                    </Col>

                </Row>

                {/* Modals */}
                <LoginModal/>
            </Layout>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        requesting: state.requesting
    }
)
const mapDispatchToProps = (dispatch, ownProps)=>(
    {
        openLoginModal: ()=>{
            dispatch(openedModals({loginModal: true}));
        }
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);