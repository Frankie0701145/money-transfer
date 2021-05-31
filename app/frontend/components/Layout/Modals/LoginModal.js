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
import login from "../../../redux/actionCreators/login_action";

import "./LoginModal.css";

const {Title} = Typography;

class LoginModal extends Component{

    formRef = React.createRef();

    save = ()=>{
        this.formRef.current.submit();
    }

    onFinish = (values)=>{
        this.props.login(values)
    }

    formLayout ={
        size: "large"
    }

    emailRegExp = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"

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
                        onClick={()=>this.save()}
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
                        ref={this.formRef}
                        onFinish={this.onFinish}
                        name="login"
                        requiredMark="optional"
                    >
                        <Col xs={{span: 24}}>
                            <Form.Item
                                label="Email"
                                name="email"
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
                                name="password"
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
        },
        login: (credentials)=>{
            dispatch(login(credentials))
        }
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);