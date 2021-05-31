import React, {Component} from "react";
import {
    Col, Row, Typography, Layout, Button, Space,Modal,
    Form, Input
} from "antd";
import {LoginOutlined , 
    CloseOutlined, MailOutlined, LockOutlined
} from "@ant-design/icons";
import { connect } from 'react-redux';
import openedModals from "../../../redux/actionCreators/opened_modals_action";

import "./LoginModal.css";

const {Title} = Typography;

class LoginModal extends Component{

    formLayout ={
        size: "large"
    }
    render(){
        return(
            <Modal
                destroyOnClose={true}
                width={550}
                centered
                title={
                    <Title level={4} style={{color: "#fff"}}>
                        Login
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
                        icon={<LoginOutlined  />}
                        className="primary"
                        key={2}
                        loading={this.props.requesting}
                        onClick={()=>{}}
                    >
                        Login
                    </Button>
                ]}
                closeIcon={
                    <CloseOutlined style={{color: "#fff"}}/>
                }
                visible={this.props.visible}
            >
                <Row>
                    <Form
                        {...this.formLayout}
                    >
                        <Col xs={{span: 24}}>
                            <Form.Item
                                label="Email"
                                rules={
                                    [
                                        {required: true, message: "Email is required"},
                                        {pattern: this.emailRegExp, message: "This should be an email" }
                                    ]
                                }
                            >
                                <Input prefix={<MailOutlined className="site-form-item-icon" />} 
                                       placeholder="Email"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={{span: 24}}>
                            <Form.Item
                                label="Password"
                                rules={
                                    [
                                        {required: true, message:"Password is required"}
                                    ]
                                }
                            >
                                <Input.Password
                                    placeholder="Password"
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                />
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
        visible:  state.openedModals.loginModal? state.openedModals.loginModal: false,
        requesting: state.requesting
    }
)
const mapDispatchToProps = (dispatch, ownProps)=>(
    {
        closeModal: ()=>{
            dispatch(openedModals({loginModal: false}));
        }
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);