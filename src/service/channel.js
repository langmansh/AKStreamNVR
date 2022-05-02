import request from '../util/request';
import apiconfig from '../config/apiconfig'


const { searchChannelConfigs, searchChannelConfig, deleteChannelConfig, updateChannelConfig, createChannelConfig, searchChannelConfigByVas, touchChannelProxyStream, saveChannelConfig, saveChannelConfigs, queryRecordMonthly, queryRecordDaily, getOnlineStreamInfoList, getRecordFileList, getHistroyRecordFileList, getHistroyRecordFileStatus, histroyVideo, getVideoChannelList, modifyVideoChannel, activeVideoChannel, addVideoChannel, getRecordPlanList, createRecordPlan, deleteRecordPlanByName, getMediaServerList,streamLive,streamStop,startRecord,stopRecord,deleteRecordFile,startMediaServer,stopMediaServer,restartMediaServer,ptzCtrl} = apiconfig.api;


export async function findChannels(params) {
    return request({url: searchChannelConfigs, method: 'get', data: params,});
}

export async function findChannel(id) {
    return request({url: searchChannelConfig, method: 'get', data: {id: id},});
}

export async function findChannelByVas(vhost, app, stream) {
    return request({url: searchChannelConfigByVas, method: 'get', data: {vhost, app, stream},});
}

export async function saveChannels(params) {
    return request({url: saveChannelConfigs, method: 'post', data: {data: params},});
}

export async function modifyChannel(id, params) {
    return request({url: updateChannelConfig, method: 'post', data: {id: id, ...params},});
}

export async function deleteChannel(id) {
    return request({url: deleteChannelConfig, method: 'post', data: {id: id},});
}

export async function createChannel(params) {
    return request({url: createChannelConfig, method: 'post', data: params,});
}

export async function findChannelRecordMonthly(vhost, app, stream, period) {
    return request({url: queryRecordMonthly, method: 'get', data: {
            vhost, app, stream, period
        },});
}

export async function findChannelRecordDaily(vhost, app, stream, period) {
    return request({url: queryRecordDaily, method: 'get', data: {
            vhost, app, stream, period
        },});
}

export async function requestTouchChannelProxyStream(vhost, app, stream) {
    return request({url: touchChannelProxyStream, method: 'post',data: {vhost, app, stream},});
}

export async function OnlineStreamInfoList(params) {
    return request({url: getOnlineStreamInfoList,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'post', data: params,});
}

export async function GetRecordFileList(params) {
    return request({url: getRecordFileList,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'post', data: params,});
}

export async function GetHistroyRecordFileList(deviceId,channelId,params) {
    return request({url: getHistroyRecordFileList+"?"+"deviceId="+deviceId+"&"+"channelId="+channelId,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'post', data: params,});
}

export async function GetHistroyRecordFileStatus(taskId) {
    return request({url: getHistroyRecordFileStatus,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'get', data: {taskId: taskId},});
}

export async function HistroyVideo(taskId,ssrcId) {
    return request({url: histroyVideo,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'get', data: {taskId: taskId,ssrcId:ssrcId},});
}

export async function GetVideoChannelList(params) {
    return request({url: getVideoChannelList,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'post', data: params,});
}

export async function ActiveVideoChannel(mainId,params) {
    return request({url: activeVideoChannel+"?mainId="+mainId,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'post', data: params,});
}

export async function ModifyVideoChannel(mainId,params) {
    return request({url: modifyVideoChannel+"?mainId="+mainId,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'post', data: params,});
}

export async function AddVideoChannel(params) {
    return request({url: addVideoChannel,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'post', data: params,});
}

export async function GetRecordPlanList(name) {
	let url = name === undefined ? getRecordPlanList : getRecordPlanList+"?name="+name;
    return request({url: url,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'get', data: null,});
}

export async function CreateRecordPlan(params) {
    return request({url: createRecordPlan,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'post', data: params,});
}

export async function DeleteRecordPlanByName(name) {
    return request({url: deleteRecordPlanByName+"?name="+name,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'get', data: null,});
}

export async function GetMediaServerList(params) {
    return request({ url: getMediaServerList, config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'get', data: null, });
}

export async function StreamLive(mediaServerId,mainId) {
    return request({url: streamLive+"?mediaServerId="+mediaServerId+"&mainId="+mainId,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'get', data: null,});
}

export async function StreamStop(mediaServerId,mainId) {
    return request({url: streamStop+"?mediaServerId="+mediaServerId+"&mainId="+mainId,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'get', data: null,});
}

export async function StartRecord(mediaServerId,mainId) {
    return request({url: startRecord+"?mediaServerId="+mediaServerId+"&mainId="+mainId,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'get', data: null,});
}

export async function StopRecord(mediaServerId,mainId) {
    return request({url: stopRecord+"?mediaServerId="+mediaServerId+"&mainId="+mainId,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'get', data: null,});
}

export async function DeleteRecordFile(dbId) {
    return request({url: deleteRecordFile+"?dbId="+dbId,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'get', data: null,});
}

export async function StartMediaServer(mediaServerId) {
    return request({url: startMediaServer+"?mediaServerId="+mediaServerId,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'get', data: null,});
}

export async function StopMediaServer(mediaServerId) {
    return request({url: stopMediaServer+"?mediaServerId="+mediaServerId,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'get', data: null,});
}

export async function RestartMediaServer(mediaServerId) {
    return request({url: restartMediaServer+"?mediaServerId="+mediaServerId,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'get', data: null,});
}

export async function PtzCtrl(params) {
    return request({url: ptzCtrl,config:{headers:{"AccessKey":apiconfig.AccessKey}}, method: 'post', data: params,});
}