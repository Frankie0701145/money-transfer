import axios from 'axios';


const logout = ( )=>{
    let auth_token = Cookies.get("auth_token");
    let config = {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}` 
        }
    };
    return(dispatch)=>{
        return axios.delete("/users/logout", {}, config).then((response)=>{

        }).catch((err)=>{

        });
    }
}

export default logout;