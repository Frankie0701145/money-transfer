import { OPENED_MODALS } from '../actionTypes';

const openedModals= (state={}, action)=>{

    switch(action.type){
        case OPENED_MODALS:
           return {
               ...state,
               ...action.openedModals
           }
        default:
           return state
    }
};

export default openedModals;