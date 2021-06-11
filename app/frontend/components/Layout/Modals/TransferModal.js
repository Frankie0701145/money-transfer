import React, {Component} from "react";
import { Modal, Button, Typography, Form, Row, 
    Col, Input, InputNumber, Select 
} from "antd";
import  { SendOutlined, CloseOutlined } from "@ant-design/icons";
import openedModals from "../../../redux/actionCreators/opened_modals_action";
import fetchAllUserPhoneNumbers from "../../../redux/actionCreators/fetch_all_user_phone_numbers_action";
import transferAction from "../../../redux/actionCreators/transfer_action";
import { connect } from 'react-redux';

const {Title} = Typography;
const { Option } = Select;

class TransferModal extends Component {

    formRef = React.createRef();

    userPhoneNumbers = ()=>(
        this.props.userPhoneNumbers.map((phoneNumber, index)=>(
            <Option value={phoneNumber} key={index}>
                {
                    phoneNumber
                }
            </Option>
        ))
    )

    onSave= ()=>{
        this.formRef.current.submit();
    }

    onFinish = (values)=>{
        this.props.transferAction(values);
    }

    render(){
        return(
            <Modal
                destroyOnClose={true}
                width={550}
                centered
                title={
                    <Title level={4} style={{color: "#fff"}}>
                        Transfer Money
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
                        requiredMark="optional"
                        name="transfer"
                        onFinish={this.onFinish}
                    >
                        <Col xs={{span: 24}}>
                            <Form.Item
                                label="Phone Number"
                                name="receiver_phone_number"
                                rules={
                                    [
                                        { required: true, message: "Phone Number is required" },
                                    ]
                                }
                            >
                               <Select
                                    showSearch
                                    style={{ width: 200 }}
                               >
                                   {
                                       this.userPhoneNumbers()
                                   }
                               </Select>
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


    componentDidUpdate(prevProps){
        // if the previous visible props was false and the current visible props is true fetch users phone numbers
        if(!prevProps.visible && this.props.visible){
            this.props.fetchAllUserPhoneNumbers();
        }
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        visible:  state.openedModals.transferModal? state.openedModals.transferModal: false,
        requesting: state.requesting,
        userPhoneNumbers: state.userPhoneNumbers
    }
)
const mapDispatchToProps = (dispatch, ownProps)=>(
    {
        closeModal: ()=>{
            dispatch(openedModals({transferModal: false}));
        },
        fetchAllUserPhoneNumbers: ()=>{
            dispatch(fetchAllUserPhoneNumbers());
        },
        transferAction: (transactionDetails)=>{
            dispatch(transferAction(transactionDetails));
        }
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(TransferModal);