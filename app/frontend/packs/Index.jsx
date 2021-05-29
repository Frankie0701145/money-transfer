import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { ConnectedRouter,routerMiddleware } from 'connected-react-router';

import rootReducer from '../redux/reducers/index_reducer';
import App from '../components/App';

const history = createBrowserHistory();

export const store = createStore(
    rootReducer(history),
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            routerMiddleware(history)
        )
    )
)

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history} hasTimeTravel={false}>
                <App/>
            </ConnectedRouter>
        </Provider>, 
        document.body.appendChild(document.createElement('div')));
});