import {REQUESTING } from "../actionTypes"

const requesting = (state=false, action)=>{
    
    switch(action.type){
        case REQUESTING:
            return action.requesting
        default:
            return state;
    }
}

export default requesting;