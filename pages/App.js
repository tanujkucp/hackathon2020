import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {GoogleSignin} from 'react-native-google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './Splash';
import Home from './Home';
import Login from './Login';
import {getSavedUser} from '../redux/actions/AuthActions';
import {useSelector, useDispatch} from 'react-redux';
import {createSelector} from 'reselect';
import {AUTH_GET_USER} from '../redux/actionTypes';


const Stack = createStackNavigator();

// export const sel = createSelector(
//     state => state.user
// );

// const StacksRendered = () => {
//     const user = useSelector(sel);
//     console.log('APP: ', user);
//
//     return <NavigationContainer>
//         <Stack.Navigator>
//             {user === null || user === undefined ? (
//                     <Stack.Screen
//                         name="Login"
//                         component={Login}
//                         options={{title: 'Get Started'}}
//                     />
//                 ) :
//                 (
//                     <>
//                         <Stack.Screen
//                             name="Home"
//                             component={Home}
//                             options={{title: 'Home'}}
//                         />
//                     </>
//                 )
//             }
//         </Stack.Navigator>
//     </NavigationContainer>;
// };

const App = () => {
     const [isLoading, setLoading] = useState(true);
    //const user = useSelector(state => state.user);
    //console.log('APP: ', user);

    //const dispatch = useDispatch();
    // GoogleSignin.getCurrentUser().then(userInfo => {
    //     //console.log('USER: ', userInfo);
    //     dispatch({type: AUTH_GET_USER, userInfo});
    // });
    //getSavedUser();
    //console.log(user);
    const [user, setUser] = useState(null);
    const getCurrentUser = async () => {
        return await GoogleSignin.getCurrentUser();
    };

    useEffect(() => {
        getCurrentUser().then(userInfo => {
            setUser(userInfo);
            console.log('App: ', userInfo);
            setLoading(false);
        });
       // getSavedUser();
    }, []);
    //getSavedUser();

    if (isLoading) {
        // We haven't finished checking for the token yet
        return <Splash/>;
    }

    //todo implement a stack navigator

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    {user === null || user === undefined ? (
                            <Stack.Screen
                                name="Login"
                                component={Login}
                                options={{title: 'Get Started'}}
                            />
                        ) :
                        (
                            <>
                                <Stack.Screen
                                    name="Home"
                                    component={Home}
                                    options={{title: 'Home'}}
                                />
                            </>
                        )
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};


export default App;
// export default connect(mapStateToProps(), {
//    getSavedUser,
// })(App);
