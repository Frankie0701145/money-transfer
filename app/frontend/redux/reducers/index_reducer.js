import authenticated from "./authenticated_reducer";
import requesting from "./requesting_reducer";
import userDetails from "./user_details_reducer";
import openedModals from "./opened_modals_reducer";
import userPhoneNumbers from "./user_phone_numbers_reducer";
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

const rootReducer = (history)=>(
    combineReducers({
        authenticated: authenticated,
        requesting: requesting,
        openedModals: openedModals,
        userDetails: userDetails,
        userPhoneNumbers: userPhoneNumbers,
        router: connectRouter(history)
    })
);

export default rootReducer;