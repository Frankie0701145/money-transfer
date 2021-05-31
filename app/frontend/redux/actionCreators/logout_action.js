import { message } from 'antd';
import axios from 'axios';
import logoutSuccess from "./logout_success_action";
import setUserDetails from "./set_user_details_action";
import requesting from "./requesting_action";
import Cookies from 'js-cookie';
import {push} from 'connected-react-router';

const logout = ( )=>{
    let auth_token = Cookies.get("auth_token");
    let config = {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}` 
        }
    };
    return(dispatch)=>{
        dispatch(requesting(true));
        return axios.delete("/users/logout", {}, config).then((response)=>{
            dispatch(logoutSuccess());
            dispatch(setUserDetails({}));
            Cookies.remove("auth_token");
            dispatch(requesting(false));
            dispatch(push("/"));
            message.success("Successful logout. Good Bye.", 5)
        }).catch((err)=>{
            console.log(err);
        });
    }
}

export default logout;