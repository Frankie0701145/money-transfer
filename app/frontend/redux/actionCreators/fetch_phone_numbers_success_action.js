import { FETCH_PHONE_NUMBER_SUCCESS } from "../actionTypes";

const fetchPhoneNumberSuccess= (phoneNumbers)=>{
    return {
        type: FETCH_PHONE_NUMBER_SUCCESS,
        phoneNumbers
    }
}


export default fetchPhoneNumberSuccess;