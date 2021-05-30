import {USER_DETAILS} from "../actionTypes";

const userDetails = (state={}, action)=>{
    switch(action.type){
        case USER_DETAILS:
            return action.userDetails
        default:
            return state;
    }
};

export default userDetails;