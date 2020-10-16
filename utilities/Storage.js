import {AsyncStorage} from 'react-native';
import * as Keychain from 'react-native-keychain';


/**
 *
 * @returns {Promise<String | null>}
 */
export async function getAuthToken() {
    // retrieve AUTH token from async storage
    // try {
    //     const token = await AsyncStorage.getItem(AUTH_TOKEN);
    //     if (token !== null)
    //         return JSON.parse(token);
    //     else return null;
    // } catch (e) {
    //     alert(e);
    //     return null;
    // }

    try {
        // Retrieve the credentials
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
            return JSON.parse(credentials.password);
            //return credentials.password;
        } else {
            //console.log('No credentials stored')
            return null;
        }
    } catch (error) {
        // console.log('Keychain couldn't be accessed!', error);
        return null;
    }

}

/**
 *
 * @param token: String
 * @returns {Promise<void>}
 */
export async function saveAuthToken(token) {
    // save AUTH token to async storage
    // await AsyncStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
    await Keychain.setGenericPassword(AUTH_TOKEN, JSON.stringify(token));
    //   await Keychain.setGenericPassword(AUTH_TOKEN, token);
}

/**
 *
 * @param token: String
 * @returns {Promise<void>}
 */
export async function updateAuthToken(token) {
    // update AUTH token in async storage
    // await AsyncStorage.removeItem(AUTH_TOKEN, () => {
    //     AsyncStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
    // });
    await Keychain.resetGenericPassword();
    await Keychain.setGenericPassword(AUTH_TOKEN, JSON.stringify(token));
}

/**
 *
 * @returns {Promise<void>}
 */
export async function deleteAuthToken() {
    // delete AUTH token in async storage
    //await AsyncStorage.removeItem(AUTH_TOKEN);
    await Keychain.resetGenericPassword();
}

/**
 *
 * @param user: User
 * @returns {Promise<void>}
 */
export async function saveUserDetails(user) {
    // save user details in async storage
    await AsyncStorage.setItem(SAVED_USER, JSON.stringify(user));
}

/**
 *
 * @returns {Promise<void>}
 */
export async function deleteUserDetails() {
    // delete user details in async storage
    await AsyncStorage.removeItem(SAVED_USER);
}

/**
 *
 * @returns {Promise<User | null>}
 */
export async function getUserDetails() {
    // get user details from async storage
    try {
        const user = await AsyncStorage.getItem(SAVED_USER);
        if (user !== null)
            return JSON.parse(user);
        else return null;
    } catch (e) {
        alert(e);
        return null;
    }
}
