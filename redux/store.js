import {applyMiddleware, createStore} from 'redux';
//import { createLogger } from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import reducer from './reducer';
import thunk from 'redux-thunk';

export const store = createStore(reducer);
// export const store = createStore(
//     reducer, composeWithDevTools(applyMiddleware(thunk)));
