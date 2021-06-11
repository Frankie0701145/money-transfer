import React, {Component} from "react";
import {
    Col, Row, Typography, Layout, Button, Space,Modal,
    Form, Input, Select
} from "antd";

import {CloseOutlined, MailOutlined, LockOutlined, 
    PhoneOutlined, SaveOutlined
} from "@ant-design/icons";
import { connect } from 'react-redux';
import openedModals from "../../../redux/actionCreators/opened_modals_action";
import registerUser from "../../../redux/actionCreators/register_action";

// import "./LoginModal.css";

const {Title} = Typography;
const {Option} = Select;

class RegisterModal extends Component {

    formRef = React.createRef();

    save = ()=>{
        this.formRef.current.submit();
    }

    onFinish = (values)=>{
        this.props.registerUser(values);
    }

    

    render(){
        return(
            <Modal
                destroyOnClose={true}
                width={550}
                centered
                title={
                    <Title level={4} style={{color: "#fff"}}>
                        Signup
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
                        icon={<SaveOutlined/>}
                        className="primary"
                        key={2}
                        loading={this.props.requesting}
                        onClick={()=>this.save()}
                    >
                        Register
                    </Button>
                ]}
                closeIcon={
                    <CloseOutlined style={{color: "#fff"}}/>
                }
                visible={this.props.visible}
            >
                <Row>
                    <Form
                        onFinish={this.onFinish}
                        ref={this.formRef}
                        name="user_registration"
                        requiredMark="optional"
                        layout="vertical"
                    >
                        <Col xs={{span: 24}}>
                            <Form.Item
                                label="First Name"
                                name="first_name"
                                rules={
                                    [
                                        {required: true, message: "First Name is required"}
                                    ]
                                }
                            >
                                <Input  placeholder="First Name"/>
                            </Form.Item>
                        </Col>
                        <Col xs={{span: 24}}>
                            <Form.Item
                                label="Last Name"
                                name="last_name"
                                rules={
                                    [
                                        {required: true, message: "Last Name is required"}
                                    ]
                                }
                            >
                                <Input  placeholder="Last Name"/>
                            </Form.Item>
                        </Col>

                        <Col xs={{span: 24}}>
                            <Form.Item
                                label="Phone Number"
                                name="phone_number"
                                rules={
                                    [
                                        {required: true, message: "Phone Number is required"},
                                        { min: 7, message: "Phone number digits can't be less than 7." },
                                        { max: 9, message: "Phone number digits can't be more than 9." }
                                    ]
                                }
                                
                            >
                                <Input prefix={<PhoneOutlined className="site-form-item-icon" />} 
                                       placeholder="701145333" addonBefore="+254"
                                />
                            </Form.Item>
                        </Col>
                        
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
        visible:  state.openedModals.registerModal? state.openedModals.registerModal: false,
        requesting: state.requesting
    }
)
const mapDispatchToProps = (dispatch, ownProps)=>(
    {
        closeModal: ()=>{
            dispatch(openedModals({registerModal: false}));
        },
        registerUser: (user)=>{
            dispatch(registerUser(user));
        }
    }
)

export default connect(mapStateToProps, mapDispatchToProps )(RegisterModal);