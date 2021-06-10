import {FETCH_PHONE_NUMBER_SUCCESS} from "../actionTypes";

const userPhoneNumbers = (state=[], action)=>{
    switch(action.type){
        case FETCH_PHONE_NUMBER_SUCCESS:
            return action.phoneNumbers
        default:
            return state;
    }
};

export default userPhoneNumbers;