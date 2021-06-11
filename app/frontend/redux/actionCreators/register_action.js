import { message } from 'antd';
import axios from 'axios';
import requesting from "../../redux/actionCreators/requesting_action";
import setUserDetails from "../../redux/actionCreators/set_user_details_action";
import openedModals from './opened_modals_action';
import loginSuccess from "../../redux/actionCreators/login_success_action";
import Cookies from 'js-cookie';

const registerUser = (user)=>{
    let payload = {
        registration: {
            ...user,
            phone_number: `+254${user.phone_number}`
        }
    }
    console.log(payload);
    let config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    return(dispatch)=>{
        dispatch(requesting(true));
        return axios.post("/users", payload, config).then((response)=>{
            let auth_token = response.headers.authorization.split(" ")[1]
            let data = response.data.data;
            let user = {
                id: data.id,
                ...data.attributes
            }
            dispatch(setUserDetails(user));
            dispatch(requesting(false));
            //set the auth_token cookie
            Cookies.set("auth_token", auth_token, { expires: 14 });
            dispatch(loginSuccess());
            message.success("Successful registered. Welcome.", 5);
            dispatch(openedModals({registerModal: false}));
            dispatch(push("/dashboard"));
        }).catch((err)=>{
            console.log(err.response);
            if(err.response && err.response.status && err.response.status === 422){
                let error = err.response.data;
                error.errors.forEach((error)=>{
                    message.error(error, 5);
                });
            }else{
                console.log(err);
            }
            dispatch(requesting(false));
        });
    }
}

export default registerUser;