import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {GoogleSignin} from 'react-native-google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './Splash';
import Home from './Home';
import Login from './Login';


const Stack = createStackNavigator();
const App = () => {
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const getCurrentUser = async () => {
        return await GoogleSignin.getCurrentUser();
    };

    useEffect(() => {
        getCurrentUser().then(userInfo => {
            setUser(userInfo);
            console.log('App.js USER: ', userInfo);
            setLoading(false);
        });
    }, []);
    const updateUser = (u) => {
        setUser(u);
    };

    if (isLoading) {
        // We haven't finished checking for the token yet
        return <Splash/>;
    }

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    {user === null || user === undefined ? (
                            <Stack.Screen name="Login">
                                {props => <Login {...props} updateUser={updateUser}/>}
                            </Stack.Screen>
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
