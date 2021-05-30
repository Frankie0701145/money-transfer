import {REQUESTING} from "../actionTypes";

/**
 * The actionCreator for creating the requesting action.
 * @param {boolean} boolean 
 * @returns 
 */
const requesting = (boolean)=>{
    return{
        type: REQUESTING,
        requesting: boolean
    }
}

export default requesting;