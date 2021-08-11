import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension';
import createRootReducer from '../modules/reducers'
import {persistReducer, persistStore} from 'redux-persist'
import localForage from "localforage";
import stateReconciler from "redux-persist/lib/stateReconciler/autoMergeLevel1"; //方便操作 localstore 的工具
import {createPromise} from 'redux-promise-middleware';
import axios from 'axios';
import {message} from 'antd';
import history from '../../history'
import React from "react";
import apiconfig from "../../config/apiconfig";
import lodash from "lodash";
import {LOGOUT_USER} from "../modules/userAuth/action";

/**
 * 一个 redux 日志打印扩展
 */
const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true
});


/**
 * 启用了redux 的开发工具, 下载浏览器插件可以即时查看 redux 中的变量
 * 详情参考该工具官网: https://github.com/zalmoxisus/redux-devtools-extension#usage
 */
const enhancer = composeWithDevTools(
    applyMiddleware(
        thunkMiddleware,
        createPromise({promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR']}),
        loggerMiddleware // logger加在最后
    )
);

/**
 * 配置 redux 持久化的东东
 */
const persistConfig = {
    key: 'redex_persist',
    storage: localForage,   //持久化到 localstore 中
    stateReconciler: stateReconciler,       //state中的值的合并策略
    whitelist: ['enums', 'userAuth']      //白名单模式,只有指定的 reducer 才持久化
}

const reducers = createRootReducer(history)
const persistedReducers = persistReducer(persistConfig, reducers);


/**
 * 配置下远程请求拦截器
 * 1, 增加http authorization header
 * 2, 拦截非200请求
 */
const setAxiosInterceptors = (store) => {


    axios.interceptors.request.use(function (config) {

        const {isAuthenticated, token} = store.getState().userAuth;
        if (isAuthenticated && token) {
            if(config.method=="get"){
                config.params = {
                    secret: token,
                    ...config.params
                }
            }else if(config.method=="post"){
                config.data = {
                    secret: token,
                    ...config.data
                }
            }
            //config.headers.Authorization = token;
        }

        return config;
    }, function (err) {
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function (response) {
        if (lodash.startsWith(response.request.responseURL, apiconfig.apiDomin)) {
            const rsData = response.data;
            if (rsData.code != 0) {
                if (rsData.code == -100) {
                    //message.error('会话丢失，请重新登陆');
                    //history.push('/login');
                    store.dispatch({
                        type: `${LOGOUT_USER}_SUCCESS`
                    })

                } else {
                   if(rsData.mgs){
                       message.error(rsData.msg);
                   }
                }
                const err = new Error(rsData.msg);
                err.data = rsData;
                err.response = response;
                err.code = rsData.code;
                throw err;
            }
        }
        return response;
    }, function (error) {
        message.error(error.message);
        return Promise.reject(error);
    });

};


export default function configureStore(initialState) {

    const store = createStore(
        persistedReducers,    //这个东西主要目的是把router 放到 redux store中去
        initialState,
        enhancer
    );
    setAxiosInterceptors(store);
    let persistor = persistStore(store)

    if (process.env.NODE_ENV === 'development') {
        if (module.hot) {
            module.hot.accept('../modules/reducers', () =>
                store.replaceReducer(require('../modules/reducers').default)
            );
        }
    }

    return {store, persistor}
}
