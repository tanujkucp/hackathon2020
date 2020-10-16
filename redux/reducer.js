import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import Auth from './reducers/AuthReducer';

export default combineReducers({
    Auth,
    router: routerReducer,
});
