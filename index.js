/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './pages/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {store} from './redux/store';

//const store = createStore(rootReducer);
export default function Main() {
    return (
        <PaperProvider>
            <App/>
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
