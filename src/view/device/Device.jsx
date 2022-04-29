import React from 'react';
import "./Device.less"
import {Button,message, Table,Icon, Input, Radio, Tabs, Tooltip, Tag, Divider} from "antd";
import {GetVideoChannelList,StreamLive,StreamStop,StartRecord,StopRecord} from "../../service/channel";
import RvPage from "../../component/RvPage/RvPage";
import EditForm from "./EditForm";
import RvModal from "../../component/RvModal/RvModal";
import { elementType } from 'prop-types';
import PlayForm from './PlayForm';

export default class Device extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;
        this.state = {
            data: [],
            dataTotal: 0,
            page: 1,
            pageSize: 10,
        }
    }
    
    componentDidMount() {
        this.loadChanelsData()
    }
    
    loadChanelsData = (params) => {
    	GetVideoChannelList({
    	    pageIndex: params ? params.page : this.state.page,
    	    pageSize: this.state.pageSize,
			orderBy: [
			    {
			      "fieldName": "mediaServerId",
			      "orderByDir": 0
			    }
			],
    	    // active: 1,
    	    ...params
    	}).then(res => {
    	    this.setState({
    	        data: res.data.videoChannelList,
    	        dataTotal: res.data.total,
    	        page: res.data.request.pageIndex,
    	        pageSize: res.data.request.pageSize,
    	    })
    	})
    }
    
    activeVideoRecord = (channel) => {
        RvModal.open({
            width: 1120,
            title: `激活设备: ${channel.channelName}`,
            footer: null,
            onCancel: (args) => args.refresh && this.loadChanelsData(),
        }, <EditForm mode="active" channel={channel} />)
    }
	
	editVideoRecord = (channel) => {
	    RvModal.open({
	        width: 1120,
	        title: `编辑设备: ${channel.channelName}`,
	        footer: null,
	        onCancel: (args) => args.refresh && this.loadChanelsData(),
	    }, <EditForm mode="edit" channel={channel} />)
	}

	getStreamLive = (channel) => {
        // StreamLive(channel.mediaServerId,channel.mainId).then(res => {
		// 	if(res._success && res._statusCode === 200 && res.data)
		// 	{
		// 		message.success('推流成功!');
		// 	}
        // })
		RvModal.open({
			width: 1120,
			title: `实时视频: ${channel.channelName}`,
			footer: null,
			onCancel: (args) => args.refresh && this.loadChanelsData(),
		}, <PlayForm channel={channel}/>)
    }

	getStreamStop = (channel) => {
        StreamStop(channel.mediaServerId,channel.mainId).then(res => {
			if(res._success && res._statusCode === 200 && res.data)
			{
				message.success('结束推流成功!');
			}
        })
    }

	getStartRecord = (channel) => {
        StartRecord(channel.mediaServerId,channel.mainId).then(res => {
			if(res._success && res._statusCode === 200 && res.data.result)
			{
				message.success('开始录制成功!');
			}
			else{
				message.error('录制失败!');
			}
        })
    }

	getStopRecord = (channel) => {
        StopRecord(channel.mediaServerId,channel.mainId).then(res => {
			if(res._success && res._statusCode === 200 && res.data.result)
			{
				message.success('暂停录制成功!');
			}
			else{
				message.error('暂停录制失败!');
			}
        })
    }
    
    deleteChannelVideoRecord = () => {
        message.info("暂未实现!!")
    }
    
    render() {
    
    
        return (
            <RvPage className={"home-page"} headerTools={
				<div>
					<Button icon={"plus"} type="primary" onClick={() => {
					    RvModal.open({
					        width: 950,
					        title: `添加设备`,
					        footer: null,
					        onCancel: (args) => args.refresh && this.loadChanelsData(),
					    }, <EditForm mode="create"/>)
					}}>添加设备</Button>
				</div>
			}>
                <Table className={"device-table"}
                       columns={[
                           {
                               title: '设备编号',
                               dataIndex: 'mainId',
                               key: 'mainId',
							   width: 160
                           },
    					   {
    					       title: '设备名称',
    					       dataIndex: 'channelName',
    					       key: 'channelName',
							   width: 160
    					   },
						   {
						       title: '设备类型',
						       dataIndex: 'videoDeviceType',
						       key: 'videoDeviceType',
							   width: 160
						   },
						   {
						       title: '流媒体服务器',
						       dataIndex: 'mediaServerId',
						       key: 'mediaServerId',
							   width: 160
						   },
						   {
						       title: '接入类型',
						       dataIndex: 'deviceStreamType',
						       key: 'deviceStreamType',
						       width: 160
						   },
						   {
						       title: '网络类型',
						       dataIndex: 'deviceNetworkType',
						       key: 'deviceNetworkType',
						       width: 160
						   },
						   {
						       title: 'ipV4地址',
						       dataIndex: 'ipV4Address',
						       key: 'ipV4Address',
						       width: 160
						   },
						   {
						       title: '推拉流方式',
						       dataIndex: 'methodByGetStream',
						       key: 'methodByGetStream',
						       width: 160
						   },
						   {
						       title: '自动推流',
						       dataIndex: 'autoVideo',
						       key: 'autoVideo',
						       width: 160,
							   render: (text) => (
									<span>
										{
											text ? <Tag color='geekblue'>开启</Tag> : <Tag color='volcano'>关闭</Tag>
										}
									</span>
							   ),
						   },
    					   {
    					       title: '通道ID',
    					       dataIndex: 'channelId',
    					       key: 'channelId',
							   width: 180
    					   },
                           {
                               title: '设备ID',
                               dataIndex: 'deviceId',
                               key: 'deviceId',
                               width: 180
                           },
                           {
                               title: '操作',
                               key: 'action',
                               width: 350,
							   fixed: 'right',
                               render: (text, record) => (
                                   <span>
                                       {
										   record.mediaServerId && record.mediaServerId.indexOf('unknown_server') ? <a href="javascript:;" onClick={()=>this.editVideoRecord(record)}>编辑</a> : <a href="javascript:;" onClick={()=>this.activeVideoRecord(record)}><font color='red'>激活</font></a>
									   }	
									   <Divider type="vertical" />
									   {
										   record.mediaServerId && record.mediaServerId.indexOf('unknown_server') ? <a href="javascript:;" onClick={()=>this.getStreamLive(record)}>播放</a> : ""
									   }
									   <Divider type="vertical" />
									   {
										   record.mediaServerId && record.mediaServerId.indexOf('unknown_server') ? <a href="javascript:;" onClick={()=>this.getStreamStop(record)}>结束推流</a> : ""
									   }  
									   <Divider type="vertical" />
									   {
										   record.mediaServerId && record.mediaServerId.indexOf('unknown_server') ? <a href="javascript:;" onClick={()=>this.getStartRecord(record)}>录制文件</a> : ""
									   }  
									   <Divider type="vertical" />
									   {
										   record.mediaServerId && record.mediaServerId.indexOf('unknown_server') ? <a href="javascript:;" onClick={()=>this.getStopRecord(record)}>暂停录制</a> : ""
									   }  
                                   </span>
                               ),
                           },
                       ]}
                       dataSource={this.state.data}
                       pagination={{
                           onChange: page => {
                               this.loadChanelsData({
                                   page: page,
                               })
                           },
                           current: this.state.page,
                           showQuickJumper: true,
                           total: this.state.dataTotal,
                           pageSize: this.state.pageSize,
                       }}
					   scroll={{ x: 'calc(1320px + 50%)' }}
                />
            </RvPage>
        );
    }
    
    static propTypes = {}
    static defaultProps = {}
}
