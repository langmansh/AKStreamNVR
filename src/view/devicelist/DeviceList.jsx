import React from 'react';
import "./DeviceList.less"
import {Button,message, Table,Icon, Input, Radio, Tabs, Tooltip, Tag, Divider} from "antd";
import {GetVideoChannelList,StreamLive,StreamStop,StartRecord,StopRecord,GetSipDeviceList} from "../../service/channel";
import RvPage from "../../component/RvPage/RvPage";
import EditForm from "./ChannelForm";
import RvModal from "../../component/RvModal/RvModal";
import { elementType } from 'prop-types';
import Play from './Play';

export default class DeviceList extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;
        this.state = {
            data: [],
            dataTotal: 0,
            page: 1,
            pageSize: 15,
			sipDeviceList:[],
        }
    }
    
    componentDidMount() {
        // this.loadChanelsData(),
		this.getSipDeviceList()
    }

	getSipDeviceList = ()=>{
		GetSipDeviceList().then(res => {
			if(res._success && res._statusCode === 200 && res.data)
			{
				this.setState({
					data: res.data,
					// dataTotal: res.data.result.count(),
					sipDeviceList: res.data
				})
			}
		})
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
    	        data: res.data.items,
    	        dataTotal: res.data.total,
    	        page: res.data.page,
    	        pageSize: res.data.pageSize,
    	    })
    	})
    }
    
	channelList = (channel) => {
	    RvModal.open({
	        width: 1120,
	        title: `通道查看: ${channel.deviceId}`,
	        footer: null,
	        onCancel: (args) => args.refresh && this.loadChanelsData(),
	    }, <EditForm mode="edit" deviceId={channel.deviceId} />)
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
		}, <Play channel={channel}/>)
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
            <RvPage className={"home-page"}>
                <Table className={"device-table"}
                       columns={[
                           {
                               title: '设备ID',
                               dataIndex: 'deviceId',
                               key: 'deviceId',
							   width: 160
                           },
						   {
							title: '是否就绪',
							dataIndex: 'isReday',
							key: 'isReday',
							width: 160,
							render: (text) => (
								 <span>
									 {
										 text ? <Tag color='green'>是</Tag> : <Tag color='red'>否</Tag>
									 }
								 </span>
							),
						   },
    					   {
    					       title: '设备IP',
    					       dataIndex: 'ipAddress',
    					       key: 'ipAddress',
							   width: 160
    					   },
						   {
						       title: '设备端口',
						       dataIndex: 'port',
						       key: 'port',
							   width: 160
						   },
						   {
						       title: '注册时间',
						       dataIndex: 'registerTime',
						       key: 'registerTime',
							   width: 160
						   },
						   {
						       title: '最后心跳时间',
						       dataIndex: 'keepAliveTime',
						       key: 'keepAliveTime',
						       width: 160
						   },
						   {
						       title: '心跳丢失次数',
						       dataIndex: 'keepAliveLostTime',
						       key: 'keepAliveLostTime',
						       width: 160
						   },
                           {
                               title: '操作',
                               key: 'action',
                               width: 350,
							   fixed: 'right',
                               render: (text, record) => (
                                   <span>
                                       {/* {
										   record.mediaServerId && record.mediaServerId.indexOf('unknown_server') ? <a href="javascript:;" onClick={()=>this.editVideoRecord(record)}>编辑</a> : <a href="javascript:;" onClick={()=>this.activeVideoRecord(record)}><font color='red'>激活</font></a>
									   }	 */}
									   <Divider type="vertical" />
									   {
										   <a href="javascript:;" onClick={()=>this.channelList(record)}>通道查看</a>
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
