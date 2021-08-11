import React from 'react';
import {Button, Radio, Icon, Input, InputNumber, message, Select} from "antd";
import PropTypes from "prop-types";
import RvForm from "../../component/RvForm/RvForm";

import {BizRegex} from "../../util/globalHelp";
import {createChannel, findChannel, modifyChannel} from "../../service/channel";
import RvSwitch from "../../component/RvSwitch/RvSwitch";
import UrlParse from 'url-parse'


@RvForm.create()
export default class ChannelForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            formData: {},
            fields: [
                {

                    label: '通道名称',
                    name: 'name',
                    option: {
                        rules: [{
                            required: true,
                        },]
                    },
                }, {
                    label: '是否启用',
                    name: 'active',
                    option: {
                        rules: [{
                            required: false,
                        },]
                    },
                    comp: <RvSwitch/>,
                }, {
                    label: '虚拟主机Vhost',
                    name: 'vhost',
                    placeholder: "__defaultVhost__",
                    option: {
                        rules: [{
                            required: false,
                        },]
                    }
                }, {
                    label: '应用标识App',
                    name: 'app',
                    placeholder: "live",
                    option: {
                        rules: [{
                            required: true,
                        },]
                    }
                }, {
                    label: '通道标识Stream',
                    placeholder: "stream_1",
                    name: 'stream',
                    option: {
                        rules: [{
                            required: true,
                        },]
                    }
                }, {
                    label: '接入协议',
                    name: 'source_protocol',
                    option: {
                        rules: [{
                            required: true,
                        },]
                    },
                    comp: (
                        <Radio.Group buttonStyle="solid">
                            <Radio.Button value={"rtsp:"}>RTSP</Radio.Button>
                            <Radio.Button value={"rtmp:"}>RTMP</Radio.Button>
                            <Radio.Button value={"hls:"}>HLS</Radio.Button>
                        </Radio.Group>
                    )
                }, {
                    label: '接入地址',
                    placeholder: "rtsp://admin:12345@172.6.22.106:554/h264/ch33/main/av_stream",
                    name: 'source_url',
                    option: {
                        rules: [{
                            required: true,
                        },]
                    },
                    comp: <Input/>
                }, {
                    label: 'FFMpeg拉流参数配置',
                    _source_protocol_filter: "hls:",
                    placeholder: "-i %s -c:a aac -strict -2 -ar 44100 -ab 48k -c:v libx264 -f flv %s",
                    extra: '仅在接入协议为 HLS 时有效，非专业人员请不要随意设置',
                    name: 'ffmpeg_cmd',
                    option: {
                        rules: [{
                            required: false,
                        },]
                    }
                }, {
                    label: 'RTSP传输方式',
                    _source_protocol_filter: "rtsp:",
                    extra: '仅在接入类型为 RTSP 时有效!',
                    name: 'rtsp_transport',
                    option: {
                        rules: [{
                            required: true,
                        },]
                    },
                    comp: <Radio.Group buttonStyle="solid">
                        <Radio.Button value={1}>TCP</Radio.Button>
                        <Radio.Button value={0}>UDP</Radio.Button>
                    </Radio.Group>
                }, {
                    label: '录像保留(天)',
                    extra: '不开启录像，填0。',
                    name: 'record_mp4',
                    option: {
                        rules: [{
                            required: true,
                        },]
                    },
                    comp: <InputNumber min={0}/>
                }, {
                    label: 'HLS直播',
                    name: 'enable_hls',
                    option: {
                        rules: [{
                            required: false,
                        },]
                    },
                    comp: <RvSwitch/>,
                }, {
                    label: '按需直播',
                    extra: '仅在不开启录像时有效!',
                    name: 'on_demand',
                    option: {
                        rules: [{
                            required: false,
                        },]
                    },
                    comp: <RvSwitch/>,
                }
            ]
        }
    }

    componentDidMount() {
        const {mode, id} = this.props;
        if (mode !== "create") {
            this.setState({
                loading: true,
            })
            findChannel(id).then((res) => {
                const sourURL = UrlParse(res.data.source_url, true);
                const protocol = sourURL.protocol;
                var source_protocol = protocol;
                if (protocol === "http:" || protocol === "https:") {
                    source_protocol = "hls:"
                }

                this.setState({
                    formData: {
                        ...res.data,
                        source_protocol

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
                    active: 0,
                    source_protocol: "rtsp:",
                    on_demand: 1,
                    record_mp4: 0,
                    enable_hls: 1
                },
            })
        }
    }


    handleEditSubmit = (values) => {
        const {id} = this.props;
        modifyChannel(id, values).then((res) => {
            if (res.code == 0) {
                message.info("编辑通道配置成功!");
                this.closeModalIfExist({triggerCancel: true, refresh: true});
            } else {
                message.error(res.msg);
            }
        })
    }

    handleCreateSubmit = (values) => {
        this.handleSubmit(createChannel, values);
        createChannel(values).then((res) => {
            if (res.code == 0) {
                message.info("添加通道配置成功!");
                this.closeModalIfExist({triggerCancel: true, refresh: true});
            } else {
                message.error(res.msg);
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
        const {fields, loading, formData} = this.state;
        const {mode, form} = this.props;


        let _fields = fields;

        const sourceProtocol = form.getFieldValue("source_protocol") || formData["source_protocol"];
        if (sourceProtocol) {
            _fields = _fields.filter(f => {
                return !f._source_protocol_filter || f._source_protocol_filter == sourceProtocol;
            })
        } else {
            _fields = _fields.filter(f => {
                return !f._source_protocol_filter;
            })
        }

        const recordMp4 = form.getFieldValue("record_mp4") || formData["record_mp4"];
        if (recordMp4) {
            _fields = _fields.filter(f => {
                return f.name != "on_demand";
            })
        }

        return (
            <RvForm
                footer={<div>
                    {mode != "view" ? <Button type="primary" htmlType="submit">确定</Button> : null}
                    <Button onClick={this.closeModalIfExist}>放弃</Button>
                </div>}
                loading={loading}
                onEditSubmit={this.handleEditSubmit}
                onCreateSubmit={this.handleCreateSubmit}
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
