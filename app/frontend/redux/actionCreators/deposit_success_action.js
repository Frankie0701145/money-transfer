import {DEPOSIT_SUCCESS} from "../actionTypes";

const depositSuccess = (account)=>{
    return{
        type: DEPOSIT_SUCCESS,
        account
    }
}

export default depositSuccess;