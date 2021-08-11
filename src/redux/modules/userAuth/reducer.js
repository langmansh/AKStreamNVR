import {
    LOGIN_USER,
    LOGOUT_USER,
} from './action';
import apiconfig from '../../../config/apiconfig'

const initialState = {
    isLogging: false,       //是否处于登录中

    token: apiconfig.secret,
    isAuthenticated: true,
    //userInfos
    loginName: 'AKStream'
};

export const userAuth = (state = initialState, action) => {
	
    switch (action.type) {
        case `${LOGIN_USER}_PENDING`:
            return {
                ...state,
                isLogging: true,
            };
        case `${LOGIN_USER}_SUCCESS`:
            const secret = action.payload.secret;
            return {
                ...state,
                isAuthenticated: true,
                token: apiconfig.secret,
                loginName: "UNKNOW",
                isLogging: false,
            };
        case `${LOGIN_USER}_ERROR`:
            return {
                ...state,
                ...initialState
            };

        case `${LOGOUT_USER}_SUCCESS`:
            return {
                ...state,
                ...initialState
            };
        case `${LOGOUT_USER}_ERROR`:
            return {
                ...state,
                ...initialState
            };
        default:
            return state;
    }
}

