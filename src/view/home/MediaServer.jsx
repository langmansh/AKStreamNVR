import React from 'react';
import {findServerAllSession, kickServerTcpSession} from "../../service/global";
import {GetMediaServerList,StartMediaServer,StopMediaServer,RestartMediaServer} from "../../service/channel";
import {message, Table,Tag,Divider} from "antd";


export default class MediaServer extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;
        this.state = {
            mediaServer: [],
            mediaServerLoading: false,
        }
    }

    componentDidMount() {
        this.loadMediaServerData();
    }

    loadMediaServerData = () => {
        this.setState({
            mediaServerLoading: true,
        }, () => {
            GetMediaServerList().then((res) => {
                if (res._statusCode == 200) {
                    this.setState({
                        mediaServer: res.data,
                        mediaServerLoading: false
                    })
                }
            })
        })
    }


    startMediaServer = (record) => {
        StartMediaServer(record.mediaServerId).then(res => {
            if (res._statusCode == 200 && res.data.isRunning) {
                message.info(`启动 -> ${record.mediaServerId} -> 成功!`);
                this.loadMediaServerData();
            }
            else
            {
                message.error(`启动 -> ${record.mediaServerId} -> 失败!`);
                this.loadMediaServerData();
            }
        })
    }

    stopMediaServer = (record) => {
        StopMediaServer(record.mediaServerId).then(res => {
            if (res._statusCode == 200 && res.data) {
                message.info(`停止 -> ${record.mediaServerId} -> 成功!`);
                this.loadMediaServerData();
            }
            else
            {
                message.error(`停止 -> ${record.mediaServerId} -> 失败!`);
                this.loadMediaServerData();
            }
        })
    }

    restartMediaServer = (record) => {
        RestartMediaServer(record.mediaServerId).then(res => {
            if (res._statusCode == 200 && res.data.isRunning) {
                message.info(`重启 -> ${record.mediaServerId} -> 成功!`);
                this.loadMediaServerData();
            }
            else
            {
                message.error(`重启 -> ${record.mediaServerId} -> 失败!`);
                this.loadMediaServerData();
            }
        })
    }

    render() {
        return (
            <Table columns={[
                {
                    title: '服务IP',
                    dataIndex: 'ipV4Address',
                },
                {
                    title: '流媒体ID',
                    dataIndex: 'mediaServerId',
                },
                {
                    title: 'AKStreamKeeper服务',
                    dataIndex: 'isKeeperRunning',
                    render: (text, record) => {
                        return text ? <Tag color='geekblue'>运行中</Tag> : <Tag color='volcano'>未运行</Tag>
                    }
                },
                {
                    title: 'ZLMediaKit服务',
                    dataIndex: 'isMediaServerRunning',
                    render: (text, record) => {
                        return text ? <Tag color='geekblue'>运行中</Tag> : <Tag color='volcano'>未运行</Tag>
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 360,
                    render: (text, record) => (
                        <span>
                            <a href="javascript:;" onClick={()=>this.startMediaServer(record)}>启动</a>
                            <Divider type="vertical" />
                            <a href="javascript:;" onClick={()=>this.stopMediaServer(record)}>停止</a>
                            <Divider type="vertical" />
                            <a href="javascript:;" onClick={()=>this.restartMediaServer(record)}>重启</a>
                        </span>
                    )
                },
            ]} dataSource={this.state.mediaServer} size="small"/>
        );
    }



    static propTypes = {}
    static defaultProps = {}
}
