import authenticated from "./authenticated_reducer";
import requesting from "./requesting_reducer";
import userDetails from "./user_details_reducer";
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

const rootReducer = (history)=>(
    combineReducers({
        authenticated: authenticated,
        requesting: requesting,
        userDetails: userDetails,
        router: connectRouter(history)
    })
);

export default rootReducer;