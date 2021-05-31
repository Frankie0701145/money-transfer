import React, {Component} from "react";
import { Modal, Button, Typography, Form, Row, Col, Input, InputNumber  } from "antd";
import  { SendOutlined, CloseOutlined } from "@ant-design/icons";
import openedModals from "../../../redux/actionCreators/opened_modals_action";
import { connect } from 'react-redux';

import "./DepositModal.css";

const {Title} = Typography;

class DepositModal extends Component{
    render(){
        return(
            <Modal
                destroyOnClose={true}
                width={550}
                centered
                title={
                    <Title level={4} style={{color: "#fff"}}>
                        Mpesa Deposit
                    </Title>
                }
                onCancel={()=>{
                    this.props.closeModal();
                }}
                footer={[
                    <Button
                        onClick={()=>{
                            this.props.closeModal();
                        }}
                        key={1}
                        loading={this.props.requesting}
                        className="variant-negative"
                    >
                        Cancel
                    </Button>,

                    <Button 
                        icon={ <SendOutlined/> }
                        className="primary"
                        key={2}
                        loading={this.props.requesting}
                        onClick={()=>this.save()}
                    >
                        Send
                    </Button>
                ]}
                closeIcon={
                    <CloseOutlined style={{color: "#fff"}}/>
                }
                visible={this.props.visible}
            >
                <Row>
                    <Form
                        layout="vertical"
                    >
                        <Col xs={{span: 24}}>
                            <Form.Item
                                label="Phone Number"
                                name="phone_number"
                            >
                                <Input/>
                            </Form.Item>
                        </Col>

                        <Col xs={{span: 24}}>
                            <Form.Item
                                label="Amount"
                                name="amount"
                            >
                                <InputNumber style={{width: "100%"}}/>
                            </Form.Item>
                        </Col>
                    </Form>
                </Row>
            </Modal>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        visible:  state.openedModals.depositModal? state.openedModals.depositModal: false,
        requesting: state.requesting
    }
)
const mapDispatchToProps = (dispatch, ownProps)=>(
    {
        closeModal: ()=>{
            dispatch(openedModals({depositModal: false}));
        }
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(DepositModal);