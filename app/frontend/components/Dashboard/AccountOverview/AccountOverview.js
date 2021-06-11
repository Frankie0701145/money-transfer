import React, {Component} from "react";
import {Layout, Row, Col, Typography, Divider} from "antd";
import  { WalletFilled  } from "@ant-design/icons";
import { connect } from 'react-redux';

const {Content} = Layout;

import "./AccountOverview.css";


const {Title} = Typography;

class AccountOverView extends Component{
    
    render(){
        return(

            <Row align="top" id="accountWrapper" justify="center">

                <Col xs={{span: 23}} md={{span: 20}} id="card">
                    <Row justify="center"
                        style={{paddingTop: "5em"}}
                    >
                        <Col xs={{span: 22}}>
                            <Row justify="space-between" style={{alignItems: 'center'}}>
                                <Col>
                                    <Title level={3}>
                                        Available Balance
                                    </Title>
                                </Col>
                                <Col align="middle">
                                    <Title level={5} 
                                        style={{color: "green", verticallyAlign: "center"}}
                                    
                                    >
                                        KES {
                                            this.props.userDetails.account && this.props.userDetails.account.data?(
                                                this.props.userDetails.account.data.attributes.amount 
                                            ):(
                                                0
                                            )
                                        }
                                    </Title>
                                </Col>
                                <Divider/>
                                
                                <Col xs={24}>
                                    <Title level={5}
                                        style={{color: "green"}}
                                    >
                                        Recent Transactions
                                    </Title>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountOverView);