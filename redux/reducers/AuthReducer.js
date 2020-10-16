import {AUTH_LOGIN, AUTH_GET_USER, AUTH_LOGOUT} from '../actionTypes';

const initialState = {
    auth: null,
    user: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                user: action.user,
            };

        case AUTH_GET_USER:
            console.log('REDUCER: ', action.userInfo);
            return {
                ...state,
                user: action.userInfo,
            };

        case AUTH_LOGOUT:
            return {
                ...state,
                user: null,
            };

        default :
            return state;
    }
};
