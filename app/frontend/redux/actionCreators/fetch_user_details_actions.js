import axios from 'axios';
import Cookies from 'js-cookie';
import requesting from "../../redux/actionCreators/requesting_action";
import setUserDetails from "../../redux/actionCreators/set_user_details_action";

const fetchUserDetails = ()=>{

    let auth_token = Cookies.get("auth_token");
    let config = {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}` 
        }
    };

    return(dispatch)=>{
        // requesting turn to true.
        dispatch(requesting(true));

        return axios.get("/api/v1/users", config).then((response)=>{
            let data = response.data.data;
            let user = {
                id: data.id,
                ...data.attributes
            }
            dispatch(setUserDetails(user));
            dispatch(requesting(false));
        }).catch((err)=>{
            console.log(err);
        });
    }
}

export default fetchUserDetails;