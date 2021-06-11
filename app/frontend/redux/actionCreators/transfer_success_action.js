import {TRANSFER_SUCCESS} from "../actionTypes";

const transferSuccess = (account)=>{
    return{
        type: TRANSFER_SUCCESS,
        account
    }
}

export default transferSuccess;