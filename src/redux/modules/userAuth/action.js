import {loginServer} from "../../../service/global";

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const loginUser = (secret) => {
    return {
        type: `${LOGIN_USER}`,
        payload: {
            promise: loginServer(secret)
        }
    }
}


export const logoutUser = () => {
    return {
        type: `${LOGOUT_USER}_SUCCESS`,
        payload: {}
    }
}

