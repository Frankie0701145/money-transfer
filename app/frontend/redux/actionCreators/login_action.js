import { message } from 'antd';
import axios from 'axios';
import requesting from "../../redux/actionCreators/requesting_action";
import setUserDetails from "../../redux/actionCreators/set_user_details_action";
import loginSuccess from "../../redux/actionCreators/login_success_action";
import openedModals from "../../redux/actionCreators/opened_modals_action";
import Cookies from 'js-cookie';

/**
 * @typedef {Object} Credentials
 * @property {string} email - contains the email
 * @property {string} password - contains the password
 */

/**
 * - ActionCreator that send an authentication request to the server
 * @param {Credentials} credentials 
 */
const login = (credentials)=>{
    let payload = {
        user:credentials 
    }
    let config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    return(dispatch)=>{
        dispatch(requesting(true));
        return axios.post("/users/login", payload, config).then((response)=>{
            let auth_token = response.headers.authorization.split(" ")[1]
            let data = response.data.data;
            //set the auth_token cookie
            Cookies.set("auth_token", auth_token, { expires: 14 });
            //dispatch the loginSuccess action
            let user = {
                id: data.id,
                ...data.attributes
            }
            dispatch(setUserDetails(user));
            dispatch(loginSuccess());
            dispatch(requesting(false));
            message.success("Successful login. Welcome.", 5);
            dispatch(openedModals({loginModal: false}));
        }).catch((err)=>{
            console.log(err);
            if(err.response.status && err.response.status === 401){
                let error = err.response.data.error;
                message.error(error, 5)
            }else{
                console.log(err);
            }
            dispatch(requesting(false));
        });
    }
}

export default login;