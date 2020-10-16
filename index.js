/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './pages/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './redux/store';

//const store = createStore(rootReducer);
export default function Main() {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
