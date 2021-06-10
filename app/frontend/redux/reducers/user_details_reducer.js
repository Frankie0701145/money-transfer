import {SET_USER_DETAILS, DEPOSIT_SUCCESS} from "../actionTypes";

const userDetails = (state={}, action)=>{
    switch(action.type){
        case SET_USER_DETAILS:
            return action.userDetails
        case DEPOSIT_SUCCESS:
            return {
                ...state, 
                account: {
                    data: action.account
                }
            }
        default:
            return state;
    }
};

export default userDetails;