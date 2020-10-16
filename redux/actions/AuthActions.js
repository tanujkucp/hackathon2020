import {AUTH_LOGIN, AUTH_GET_USER, AUTH_LOGOUT} from '../actionTypes';
import {GoogleSignin} from 'react-native-google-signin';
import {useDispatch} from 'react-redux';

export function getSavedUser() {
    console.log('action called!');
    const dispatch = useDispatch();
    GoogleSignin.getCurrentUser().then(user => {
        console.log('USER: ', user);
        dispatch({type: AUTH_GET_USER, user});
    });
}
