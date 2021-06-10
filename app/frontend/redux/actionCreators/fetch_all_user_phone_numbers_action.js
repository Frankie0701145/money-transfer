import Cookies from 'js-cookie';
import axios from 'axios';
import requesting from "./requesting_action";
import fetchPhoneNumbersSuccess from "./fetch_phone_numbers_success_action";


const fetchAllUserPhoneNumbers = ()=>{
    let auth_token = Cookies.get("auth_token");
    let config = {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
        }
    }
    let pathname = "/api/v1/users/phone_numbers";
    return(dispatch)=>{
        dispatch(requesting(true));
        return axios.get(pathname, config).then((response)=>{
            let data = response.data;
            dispatch(fetchPhoneNumbersSuccess(data.user_phone_numbers));
            dispatch(requesting(false));
            console.log(data);
        }).catch((err)=>{
            console.log(err.response);
            dispatch(requesting(false));
        });
    }
}

export default fetchAllUserPhoneNumbers;