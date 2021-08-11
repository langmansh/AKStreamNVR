import localForage from "localforage";
import apiconfig from "../config/apiconfig";
import request from "../util/request";




const {getThreadsLoad, getAllSession, kickSession, restartServer, login, getServerConfig} = apiconfig.api;


export async function findThreadsLoad() {
    return request({url: getThreadsLoad, method: 'get', data: null,});
}



export async function findServerAllSession() {
    return request({url: getAllSession, method: 'get', data: null,});
}


export async function kickServerTcpSession(id) {
    return request({url: kickSession, method: 'post',  data:  {id: id}});
}


export async function restartZlmediaServer() {
    return request({url: restartServer, method: 'post', data: null,});
}


export async function loginServer(params) {
    return request({url: login, method: 'post',  data:  {...params}});
}


export async function findServerConfigParams() {
    return request({url: getServerConfig, method: 'get',  data: null,});
}




/**
 * 清除本地缓存
 * @returns {Promise<void>}
 */
export const clearLocalCache = () => {
    return localForage.clear()
}


/**
 * axios 默认方式 post 方式的 body 是 json 结构, 此方法可以将其转换为常规 post 数据结构
 */
export const transformRequest = (data, headers) => {
    const serializedData = []
    for (const k in data) {
        if (data[k]) {
            serializedData.push(`${k}=${encodeURIComponent(data[k])}`)
        }
    }
    return serializedData.join('&')
}
export const paramsSerializer = (params) => {
    const qs = require('qs');
    return qs.stringify(params, {arrayFormat: 'repeat'})
}
