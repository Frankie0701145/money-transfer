import React, {Component} from "react";
import {Layout, Row, Col, Typography, Divider, List} from "antd";
import  { WalletFilled  } from "@ant-design/icons";
import { connect } from 'react-redux';

const {Content} = Layout;

import "./AccountOverview.css";


const {Title, Text} = Typography;

class AccountOverView extends Component{


    transaction = (transaction)=>{
        let amount = transaction.attributes.transactable.data.attributes.amount;
        switch(transaction.attributes.transactable_type){
            case "DepositTransaction":
                let initiatorPhoneNumber = transaction.attributes.transactable.data.attributes.initiator_phone_number;
                let depositType = transaction.attributes.transactable.data.attributes.deposit_type;
                let message;
                if(depositType === "mpesa"){
                    message = `You received ${amount} KSH from mpesa from this number ${initiatorPhoneNumber}.`;
                }else if(depositType === "account"){
                    message = `You received ${amount} KSH from money transfer from this number ${initiatorPhoneNumber}.`;
                }
                return(
                    <Text style={{fontSize: "1em", fontWeight: "bold"}}>
                        {message}     
                    </Text>
                )
            case "TransferTransaction":
                let receiverPhoneNumber = transaction.attributes.transactable.data.attributes.receiver_phone_number;
                return (
                    <Text style={{fontSize: "1em", fontWeight: "bold"}}>
                        You transferred {amount} KSH to this number {receiverPhoneNumber}.
                    </Text>
                )
        }
    }

    transactions = (userDetails)=>{
        if(!userDetails){
            return [];
        }else if(!userDetails.account){
            return [];
        }else if(!userDetails.account.data){
            return []
        }else if(!userDetails.account.data.attributes.transaction.data){
            return []
        }else{
           return userDetails.account.data.attributes.transaction.data;
        }
    }
    
    render(){
        let transactions = this.transactions(this.props.userDetails);
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
                                    <List
                                        dataSource={
                                            transactions
                                        }
                                        renderItem={transaction => (
                                            <List.Item>
                                                {this.transaction(transaction)}
                                            </List.Item>
                                        )}
                                    />
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