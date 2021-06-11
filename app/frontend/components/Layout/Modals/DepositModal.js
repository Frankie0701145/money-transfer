import React, {Component} from "react";
import { Modal, Button, Typography, Form, Row, Col, Input, InputNumber  } from "antd";
import  { SendOutlined, CloseOutlined } from "@ant-design/icons";
import openedModals from "../../../redux/actionCreators/opened_modals_action";
import deposit from "../../../redux/actionCreators/deposit_action";
import { connect } from 'react-redux';

import "./DepositModal.css";

const {Title} = Typography;

class DepositModal extends Component{

    formRef = React.createRef();

    onSave = ()=>{
        this.formRef.current.submit();
    }

    onFinish = (values)=>{
        this.props.deposit(values);
    }
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
                        onClick={()=>this.onSave()}
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
                        ref={this.formRef}
                        onFinish={this.onFinish}
                        name="deposit"
                        requiredMark="optional"
                    >
                        <Col xs={{span: 24}}>
                            <Form.Item
                                label="Phone Number"
                                name="phone_number"
                                rules={
                                    [
                                        { required: true, message: "Phone Number is required" },
                                    ]
                                }
                            >
                                <Input/>
                            </Form.Item>
                        </Col>

                        <Col xs={{span: 24}}>
                            <Form.Item
                                label="Amount"
                                name="amount"
                                rules={
                                    [
                                        { required: true, message: "Amount is required" },
                                    ]
                                }
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
        },
        deposit: (values)=>{
            dispatch(deposit(values));
        }
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(DepositModal);