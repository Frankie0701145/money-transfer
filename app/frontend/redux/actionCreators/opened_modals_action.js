import {OPENED_MODALS} from "../actionTypes";

const openedModals = (openedModals)=>{
    return{
        type: OPENED_MODALS,
        openedModals
    }
}

export default openedModals;