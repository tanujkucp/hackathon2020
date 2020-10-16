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
            console.log(userInfo);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        // We haven't finished checking for the token yet
        return <Splash/>;
    }

    //todo implement a stack navigator

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user == null ? (
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
                    )}

            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default App;
