import { message } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import requesting from "./requesting_action";
import depositSuccess from "./deposit_success_action";
import openedModals from "./opened_modals_action";

const deposit = (transactionDetails)=>{

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

    let pathname = "/api/v1/accounts/mpesa_deposit";
    return(dispatch)=>{
        dispatch(requesting(true));
        return axios.patch(pathname, payload, config).then((response)=>{
            let data = response.data.data;
            let amount = transactionDetails.amount;
            dispatch(depositSuccess(data));
            dispatch(openedModals({depositModal: false}));
            message.success(`Successfully deposited KSH ${amount}.`);
            dispatch(requesting(false));
        }).catch((err)=>{
            console.log(err.response);
            dispatch(requesting(false));
        });
    }
}

export default deposit;