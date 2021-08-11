import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import * as userAuth from './userAuth/reducer';
import * as global from './global/reducer';


export default (history) => combineReducers({
    router: connectRouter(history),
    ...userAuth,
    ...global
})