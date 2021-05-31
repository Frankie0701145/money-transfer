import { message } from 'antd';
import axios from 'axios';
import requesting from "../../redux/actionCreators/requesting_action";
import openedModals from './opened_modals_action';

const registerUser = (user)=>{
    let payload = {
        registration: {
            ...user
        }
    }
    let config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    return(dispatch)=>{
        dispatch(requesting(true));
        return axios.post("/users", payload, config).then((response)=>{
            let data = response.data.data;
            let user = {
                id: data.id,
                ...data.attributes
            }
            dispatch(setUserDetails(user));
            dispatch(requesting(false));
            message.success("Successful registered. Welcome.", 5);
            dispatch(openedModals({registerModal: false}));
            console.log(data);
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