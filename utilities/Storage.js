import AsyncStorage from '@react-native-community/async-storage';
import * as Keychain from 'react-native-keychain';

const FOLDERS = 'FOLDERS';

export async function saveFolders(folders) {
    // save folder details in async storage
    try {
        await AsyncStorage.setItem(FOLDERS, JSON.stringify(folders));
    } catch (e) {
        console.log(e);
    }
}

export async function deleteFolders() {
    // delete folder details in async storage
    await AsyncStorage.removeItem(FOLDERS);
}

export async function getFolders() {
    // get folder details from async storage
    try {
        const folders = await AsyncStorage.getItem(FOLDERS);
        if (folders !== null) {
            return JSON.parse(folders);
        } else {
            return null;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

//
// /**
//  *
//  * @returns {Promise<String | null>}
//  */
// export async function getAuthToken() {
//     // retrieve AUTH token from async storage
//     // try {
//     //     const token = await AsyncStorage.getItem(AUTH_TOKEN);
//     //     if (token !== null)
//     //         return JSON.parse(token);
//     //     else return null;
//     // } catch (e) {
//     //     alert(e);
//     //     return null;
//     // }
//
//     try {
//         // Retrieve the credentials
//         const credentials = await Keychain.getGenericPassword();
//         if (credentials) {
//             return JSON.parse(credentials.password);
//             //return credentials.password;
//         } else {
//             //console.log('No credentials stored')
//             return null;
//         }
//     } catch (error) {
//         // console.log('Keychain couldn't be accessed!', error);
//         return null;
//     }
//
// }
//
// /**
//  *
//  * @param token: String
//  * @returns {Promise<void>}
//  */
// export async function saveAuthToken(token) {
//     // save AUTH token to async storage
//     // await AsyncStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
//     await Keychain.setGenericPassword(AUTH_TOKEN, JSON.stringify(token));
//     //   await Keychain.setGenericPassword(AUTH_TOKEN, token);
// }
//
// /**
//  *
//  * @param token: String
//  * @returns {Promise<void>}
//  */
// export async function updateAuthToken(token) {
//     // update AUTH token in async storage
//     // await AsyncStorage.removeItem(AUTH_TOKEN, () => {
//     //     AsyncStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
//     // });
//     await Keychain.resetGenericPassword();
//     await Keychain.setGenericPassword(AUTH_TOKEN, JSON.stringify(token));
// }
//
// /**
//  *
//  * @returns {Promise<void>}
//  */
// export async function deleteAuthToken() {
//     // delete AUTH token in async storage
//     //await AsyncStorage.removeItem(AUTH_TOKEN);
//     await Keychain.resetGenericPassword();
// }
