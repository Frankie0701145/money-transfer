import { message } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import requesting from "./requesting_action";
import openedModals from "./opened_modals_action";
import transferSuccess from "./transfer_success_action";

const transfer = (transactionDetails)=>{

    let payload = {
        accounts: transactionDetails 
    }

    let auth_token = Cookies.get("auth_token");

    let config = {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        }
    };

    let pathname = "/api/v1/accounts/account_transfer";
    
    return(dispatch)=>{
        dispatch(requesting(true));
        axios.patch( pathname, payload, config).then((response)=>{
            let data = response.data.data;
            let amount = transactionDetails.amount;
            let phoneNumber = transactionDetails.receiver_phone_number;
            dispatch(openedModals({transferModal: false}));
            dispatch(transferSuccess(data));
            message.success(`Successfully transferred KSH ${amount} to this number ${phoneNumber}.`);

        }).catch((err)=>{
            console.log(err.response);
            if(err.response.status && err.response.status === 422){
                let error = err.response.data.error;
                message.error(error, 5)
            }else{
                console.log(err);
            }
        });
    }
}

export default transfer;