import React from 'react';
import {Button,message, Table,Icon, Input, Radio, Tabs, Tooltip, Tag, Divider} from "antd";
import RvForm from "../../component/RvForm/RvForm";
import {findChannels, saveChannels} from "../../service/channel";
import RvJsonCodeMirror from "../../component/RvCodeMirror/RvJsonCodeMirror";
import "./ChannelForm.less"
import {isJsonArray} from "../../util/globalHelp";
import {GetVideoChannelList,StreamLive,StreamStop,StartRecord,StopRecord,GetSipDeviceList,GetMediaServerList} from "../../service/channel";
import { forEach } from 'lodash';
import RvPage from "../../component/RvPage/RvPage";
import Play from './Play';
import PlaybackPage from './PlaybackPage';
import RvModal from "../../component/RvModal/RvModal";

@RvForm.create()
export default class ChannelForm extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;
		
        this.state = {
            data: [],
            dataTotal: 0,
            page: 1,
            pageSize: 15,
			sipDeviceList:[],
            mediaServerId:""
        }
    }

    checkJson=(rule, value, callback)=>{
        if(isJsonArray(value)){
            callback();
            return;
        }else{
            callback("无效的JSON Array");
        }
    }

    componentDidMount() {
		let deviceId = this.props.deviceId;
        this.getSipDeviceChannelList();
        this.loadMediaServerData();
    }

	getSipDeviceChannelList = ()=>{
		GetSipDeviceList().then(res => {
			if(res._success && res._statusCode === 200 && res.data)
			{
				this.setState({
					data: res.data.filter(item=>item.deviceId === this.props.deviceId)[0].sipChannels,
					sipDeviceList: res.data
				})

			}
		})
	}

    loadMediaServerData = () => {
        GetMediaServerList().then((res) => {
            if (res._statusCode == 200) {
                this.setState({
                    mediaServerId:res.data.filter(item=>item.mediaServerId)[0].mediaServerId
                })
            }
        })
    }

	getStreamLive = (channel) => {
		RvModal.open({
			width: 1120,
			title: `实时视频: ${channel.deviceId}`,
			footer: null,
			onCancel: (args) => args.refresh && this.loadChanelsData(),
		}, <Play channel={channel} mediaServerId={this.state.mediaServerId} />)
    }

    viewChannelVideoRecord = (channel) => {
        RvModal.open({
            width: 1120,
            title: `回看: ${channel.deviceId}`,
            footer: null,
            onCancel: (args) => null,
        }, <PlaybackPage channel={channel}/>)
    }

    handleEditSubmit = (values) => {

        saveChannels(JSON.parse(values.data)).then((res) => {
            if (res.code == 0) {
                message.info("批量配置成功!");
                this.closeModalIfExist({triggerCancel: true, refresh: true});
            } else {
                message.error(res.msg);
            }
        })

    }

    closeModalIfExist = (args) => {
        if (this.props.closeWrappingModal)
            this.props.closeWrappingModal(args);
    }

    render() {
        return (
            <Table columns={[
                {
                    title: '通道ID',
                    dataIndex: 'deviceId',
                },
                {
                    title: '设备ID',
                    dataIndex: 'parentId',
                },
                {
                    title: '流ID',
                    dataIndex: 'stream',
                },
                {
                    title: '设备状态',
                    dataIndex: 'sipChannelStatus',
                    render: (text) => {
                        return text == 'ON' ? <Tag color='green'>在线</Tag> : <Tag color='red'>离线</Tag>
                    }
                },
				{
                    title: 'ssrcId',
                    dataIndex: 'ssrcId',
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 360,
                    render: (text, record) => {
                        return record.sipChannelStatus == 'ON' ? 
                            <span>
                            <a href="javascript:;" onClick={()=>this.getStreamLive(record)}>播放</a>
                            <Divider type="vertical" />
                            <a href="javascript:;" onClick={()=>this.viewChannelVideoRecord(record)}>国标录像</a>
                            {/* <Divider type="vertical" />
                            <a href="javascript:;" onClick={()=>this.restartMediaServer(record)}>重启</a> */}
                            </span>
                        :
                        ''

                    }
                },
            ]} dataSource={this.state.data} size="small"/>
        );
    }

	static propTypes = {}
    static defaultProps = {}
}
