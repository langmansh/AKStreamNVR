var apiDomin = `${location.protocol}//${window._env_.REACT_APP_API_HOST}`;
var apiAKStream = `${location.protocol}//${window._env_.AKSTREAM_WEB_API}`;
var secret = `${window._env_.ZlMediaKit_Secret}`;//ZLM秘钥
var AccessKey = `${window._env_.AKStream_AccessKey}`;//AKStream秘钥
const APIV1 = apiDomin + '/index/api';

module.exports = {
    YQL: [],
    CORS: [apiDomin,apiAKStream],
    apiDomin: apiDomin,
	secret:secret,
	AccessKey:AccessKey,
    api: {
        login: `${APIV1}/login`,
		
        // searchChannelConfigs: `${apiAKStream}/MediaServer/GetOnlineStreamInfoList`,
        ptzCtrl:`${apiAKStream}/SipGate/PtzCtrl`,
        restartMediaServer:`${apiAKStream}/AKStreamKeeper/RestartMediaServer`,
        stopMediaServer:`${apiAKStream}/AKStreamKeeper/ShutdownMediaServer`,
        startMediaServer:`${apiAKStream}/AKStreamKeeper/StartMediaServer`,
        deleteRecordFile:`${apiAKStream}/MediaServer/DeleteRecordFile`,
        stopRecord:`${apiAKStream}/MediaServer/StopRecord`,
        startRecord:`${apiAKStream}/MediaServer/StartRecord`,
        streamStop:`${apiAKStream}/MediaServer/StreamStop`,
        streamLive:`${apiAKStream}/MediaServer/StreamLive`,
        getMediaServerList: `${apiAKStream}/MediaServer/GetMediaServerList`,
		deleteRecordPlanByName:`${apiAKStream}/RecordPlan/DeleteRecordPlanByName`,
		createRecordPlan:`${apiAKStream}/RecordPlan/CreateRecordPlan`,
		getRecordPlanList:`${apiAKStream}/RecordPlan/GetRecordPlanList`,
		addVideoChannel:`${apiAKStream}/MediaServer/AddVideoChannel`,
		modifyVideoChannel:`${apiAKStream}/MediaServer/ModifyVideoChannel`,
		activeVideoChannel:`${apiAKStream}/MediaServer/ActiveVideoChannel`,
		getVideoChannelList:`${apiAKStream}/MediaServer/GetVideoChannelList`,
		getOnlineStreamInfoList:`${apiAKStream}/MediaServer/GetOnlineStreamInfoList`,
		getRecordFileList:`${apiAKStream}/MediaServer/GetRecordFileList`,
		getHistroyRecordFileList:`${apiAKStream}/SipGate/GetHistroyRecordFileList`,
		getHistroyRecordFileStatus:`${apiAKStream}/SipGate/GetHistroyRecordFileStatus`,
		histroyVideo:`${apiAKStream}/SipGate/HistroyVideo`,
		
		searchChannelConfigs: `${APIV1}/getMediaList?schema=rtmp`,
		getsnap:`${APIV1}/getSnap?timeout_sec=10&expire_sec=30&url=`,
        searchChannelConfig: `${APIV1}/searchChannelConfig`,
        searchChannelConfigByVas: `${APIV1}/searchChannelConfigByVas`,
        updateChannelConfig: `${APIV1}/updateChannelConfig`,
        createChannelConfig: `${APIV1}/createChannelConfig`,
        saveChannelConfig: `${APIV1}/saveChannelConfig`,
        saveChannelConfigs: `${APIV1}/saveChannelConfigs`,
        downloadChannelConfigs: `${APIV1}/downloadChannelConfigs`,
        uploadChannelConfigs: `${APIV1}/uploadChannelConfigs`,
        deleteChannelConfig: `${APIV1}/deleteChannelConfig`,

        queryRecordMonthly: `${APIV1}/queryRecordMonthly`,
        queryRecordDaily: `${APIV1}/queryRecordDaily`,

        touchChannelProxyStream: `${APIV1}/touchChannelProxyStream`,

        setServerConfig: `${APIV1}/setServerConfig`,
        getServerConfig: `${APIV1}/getServerConfig`,

        restartServer: `${APIV1}/restartServer`,

        getThreadsLoad: `${APIV1}/getThreadsLoad`,

        getMediaList: `${APIV1}/getMediaList`,
        closeStream: `${APIV1}/close_stream`,
        getAllSession: `${APIV1}/getAllSession`,
        kickSession: `${APIV1}/kick_session`,

        addStreamProxy: `${APIV1}/addStreamProxy`,
        delStreamProxy: `${APIV1}/delStreamProxy`,

        addFFmpegSource: `${APIV1}/addFFmpegSource`,
        delFFmepgSource: `${APIV1}/delFFmepgSource`,
    },
};
