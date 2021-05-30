import {SET_USER_DETAILS} from "../actionTypes";

const userDetails = (userDetails)=>{
    return {
        type: SET_USER_DETAILS,
        userDetails
    }
}

export default userDetails;