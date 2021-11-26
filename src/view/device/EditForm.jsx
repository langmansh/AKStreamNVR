import React from 'react';
import {Button, Radio, Icon, Input, InputNumber, message, Select} from "antd";
import PropTypes from "prop-types";
import RvForm from "../../component/RvForm/RvForm";

import {BizRegex} from "../../util/globalHelp";
import { createChannel, findChannel, modifyChannel, ActiveVideoChannel, ModifyVideoChannel, GetVideoChannelList, AddVideoChannel, GetMediaServerList, GetRecordPlanList} from "../../service/channel";
import RvSwitch from "../../component/RvSwitch/RvSwitch";
import UrlParse from 'url-parse'


@RvForm.create()
export default class EditForm extends React.Component {

    constructor(props) {
        super(props);
        const { Option } = Select;

        this.state = {
            loading: false,
            chlist: [],
            mediaServerID: [],
            formData: {},
            
        }
    }

    componentDidMount() {
        const { mode, channel, params } = this.props;

        GetMediaServerList({
            ...params
        }).then(res => {
            console.log(res)
            this.setState({
                mediaServerID: [...res.data],
            })
        })

        GetRecordPlanList(name).then(res => {

            if (res._success == true && res._statusCode == 200 && res.data.length > 0) {
                this.setState({
                    chlist: [...res.data],
                })
            }
        })


		if(mode == "active" || mode == "edit")
		{
			this.setState({
			    loading: true,
			})
			GetVideoChannelList({
				pageIndex: 1,
				pageSize: 1,
				orderBy: [
				    {
				      "fieldName": "mediaServerId",
				      "orderByDir": 0
				    }
				],
			    mainId:channel.mainId,
			    ...params
			}).then(res => {
				this.setState({
				    formData: {
				        ...res.data.videoChannelList[0]
				    },
				})
				
			}).finally(() => {
			    this.setState({
			        loading: false,
			    })
			})
		} else {
            this.setState({
                formData: {

                },
            })
        }
    }


    handleEditSubmit = (values) => {
        const {channel} = this.props;
        ModifyVideoChannel(channel.mainId, values).then((res) => {
            if (res._statusCode == 200 && res._success == true) {
                message.info("编辑设备成功!");
                this.closeModalIfExist({triggerCancel: true, refresh: true});
            } else {
                message.error(res.data.Message);
            }
        })
    }

    handleCreateSubmit = (values) => {
        // this.handleSubmit(createChannel, values);
        AddVideoChannel(values).then((res) => {
            if (res._statusCode == 200 && res._success == true) {
                message.info("添加设备成功!");
                this.closeModalIfExist({triggerCancel: true, refresh: true});
            } else {
                message.error(res.data.Message);
            }
        })
    }
	
	handleActiveSubmit = (values) => {
	    const {channel} = this.props;
	    ActiveVideoChannel(channel.mainId, values).then((res) => {
	        if (res._statusCode == 200 && res._success == true) {
	            message.info("激活设备成功!");
	            this.closeModalIfExist({triggerCancel: true, refresh: true});
	        } else {
	            message.error(res.data.Message);
	        }
	    })
	}

    handleSubmit = (serviceFunc, values) => {

    }

    closeModalIfExist = (args) => {
        if (this.props.closeWrappingModal)
            this.props.closeWrappingModal(args);
    }

    render() {
        const { mediaServerID, chlist, loading, formData} = this.state;
        const {mode, form} = this.props;
        const fields = [
            {

                label: '流媒体服务器',
                extra: '流媒体服务器的ID',
                name: 'mediaServerId',
                option: {
                    rules: [{
                        required: true,
                    },]
                },
                comp: (
                    <Select>
                        {mediaServerID.map(item => <Select.Option key={item.mediaServerId} value={item.mediaServerId}>{item.mediaServerId}</Select.Option>)}
                    </Select>
                )
            }, {

                label: 'App',
                extra: '应用标识APP',
                placeholder: 'rtp',
                name: 'app',
                option: {
                    rules: [{
                        required: true,
                    },]
                },
            }, {

                label: 'vhost',
                extra: '虚拟主机vhost',
                placeholder: '__defaultVhost__',
                name: 'vhost',
                option: {
                    rules: [{
                        required: true,
                    },]
                },
            }, {

                label: '设备名称',
                name: 'channelName',
                option: {
                    rules: [{
                        required: true,
                    },]
                },
            }, {

                label: 'Device ID',
                name: 'deviceId',
                option: {
                    rules: [{
                        required: false,
                    },]
                },
            }, {

                label: 'Channel ID',
                name: 'channelId',
                option: {
                    rules: [{
                        required: false,
                    },]
                },
            }, {

                label: 'ipV4',
                name: 'ipV4Address',
                option: {
                    rules: [{
                        required: true,
                    },]
                },
            }, {

                label: '录制计划模板名称',
                name: 'recordPlanName',
                option: {
                    rules: [{
                        required: false,
                    },]
                },
                comp: (
                    <Select>
                        {chlist.map(item => <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>)}
                    </Select>
                ),
            }, {

                label: '录制时长（秒）',
                name: 'recordSecs',
                option: {
                    rules: [{
                        required: false,
                    },]
                },
            }, {

                label: '网络类型',
                extra: '固定网络、移动网络',
                name: 'deviceNetworkType',
                option: {
                    rules: [{
                        required: true,
                    },]
                },
                comp: (
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value={"Fixed"}>Fixed</Radio.Button>
                        <Radio.Button value={"Mobile"}>Mobile</Radio.Button>
                    </Radio.Group>
                )
            }, {

                label: '设备类型',
                name: 'videoDeviceType',
                option: {
                    rules: [{
                        required: true,
                    },]
                },
                comp: (
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value={"NVR"}>NVR</Radio.Button>
                        <Radio.Button value={"DVR"}>DVR</Radio.Button>
                        <Radio.Button value={"IPC"}>IPC</Radio.Button>
                        <Radio.Button value={"UNKNOW"}>UNKNOW</Radio.Button>
                    </Radio.Group>
                )
            }, {

                label: '设备流类型',
                name: 'deviceStreamType',
                option: {
                    rules: [{
                        required: true,
                    },]
                },
                comp: (
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value={"GB28181"}>GB28181</Radio.Button>
                        <Radio.Button value={"Rtsp"}>Rtsp</Radio.Button>
                        <Radio.Button value={"Http"}>Http</Radio.Button>
                        <Radio.Button value={"Rtmp"}>Rtmp</Radio.Button>
                    </Radio.Group>
                )
            }, {

                label: '拉流方式',
                name: 'methodByGetStream',
                option: {
                    rules: [{
                        required: true,
                    },]
                },
                comp: (
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value={"None"}>None</Radio.Button>
                        <Radio.Button value={"SelfMethod"}>SelfMethod</Radio.Button>
                        <Radio.Button value={"UseFFmpeg"}>UseFFmpeg</Radio.Button>
                    </Radio.Group>
                )
            }, {

                label: 'Rtsp视频地址',
                extra: '仅在拉流方式是SelfMethod或UseFFmpeg时需要，默认None为GB28181拉流',
                name: 'videoSrcUrl',
                option: {
                    rules: [{
                        required: false,
                    },]
                },
                comp: <Input />,
            }, {

                label: '协议类型',
                name: 'rtpWithTcp',
                option: {
                    rules: [{
                        required: true,
                    },]
                },
                comp: (
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value={false}>UDP</Radio.Button>
                        <Radio.Button value={true}>TCP</Radio.Button>
                    </Radio.Group>
                )
            }, {

                label: '自动推流',
                extra: '服务开启后一直推流',
                name: 'autoVideo',
                option: {
                    rules: [{
                        required: false,
                    },]
                },
                comp: <RvSwitch />,
            }, {

                label: '自动断流',
                extra: '无人观看自动断流，启用自动推流请勿启用自动断流',
                name: 'noPlayerBreak',
                option: {
                    rules: [{
                        required: false,
                    },]
                },
                comp: <RvSwitch />,
            }, {

                label: '自动录制',
                name: 'autoRecord',
                option: {
                    rules: [{
                        required: false,
                    },]
                },
                comp: <RvSwitch />,
            }, {

                label: '云台控制',
                name: 'hasPtz',
                option: {
                    rules: [{
                        required: false,
                    },]
                },
                comp: <RvSwitch />,
            }, {

                label: '默认端口',
                extra: '设备是否使用流媒体默认rtp端口，如10000端口',
                name: 'defaultRtpPort',
                option: {
                    rules: [{
                        required: false,
                    },]
                },
                comp: <RvSwitch />,
            }, {

                label: '启用',
                extra: '是否启用设备',
                name: 'enabled',
                option: {
                    rules: [{
                        required: false,
                    },]
                },
                comp: <RvSwitch />,
            }
        ];

        let _fields = fields;
        

        return (
            <RvForm
                footer={<div>
                    {mode != "view" ? <Button type="primary" htmlType="submit">确定</Button> : null}
                    <Button onClick={this.closeModalIfExist}>放弃</Button>
                </div>}
                loading={loading}
                onEditSubmit={this.handleEditSubmit}
                onCreateSubmit={this.handleCreateSubmit}
				onActiveSubmit={this.handleActiveSubmit}
                {...this.props}>

                {RvForm.Item.transform(_fields, mode, formData)}
            </RvForm>
        );
    }

    static contextTypes = {}
    static propTypes = {
        id: PropTypes.any,
        mode: PropTypes.string,
    }
    static defaultProps = {
        mode: "create",
    }
}
