import React from 'react';
import {findServerAllSession, kickServerTcpSession} from "../../service/global";
import {message, Table} from "antd";


export default class ServerTcpSessions extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;
        this.state = {
            serverTcpSessions: [],
            serverTcpSessionsLoading: false,
        }
    }

    componentDidMount() {
        this.loadServerTcpSessionsData();
    }

    loadServerTcpSessionsData = () => {
        this.setState({
            serverTcpSessionsLoading: true,
        }, () => {
            findServerAllSession().then((res) => {
                console.log(res.data.code)
                if (res.data.code == 0) {
                    this.setState({
                        serverTcpSessions: res.data.data,
                        serverTcpSessionsLoading: false
                    })
                }
            })
        })
    }


    tryKickServerTcpSession = (tcpSession) => {
        kickServerTcpSession(tcpSession.id).then(res => {
            if (res.code == 0) {
                message.info(`断开${tcpSession.peer_ip}:${tcpSession.peer_port} -> ${tcpSession.local_ip}:${tcpSession.local_port} 成功!`);
                this.loadServerTcpSessionsData();
            }
        })
    }

    render() {
        return (
            <Table columns={[
                {
                    title: '远端',
                    dataIndex: 'peer_ip',
                    render: (text, record) => {
                        return `${record.peer_ip}:${record.peer_port}`
                    }
                },
                {
                    title: '本地',
                    dataIndex: 'local_ip',
                    render: (text, record) => {
                        return `${record.local_ip}:${record.local_port}`
                    }
                },
                {
                    title: '类型',
                    dataIndex: 'typeid'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 360,
                    render: (text, record) => (
                        <span>
                            <a href="javascript:;" onClick={()=>this.tryKickServerTcpSession(record)}>断开</a>
                        </span>
                    ),
                },
            ]} dataSource={this.state.serverTcpSessions} size="small"/>
        );
    }



    static propTypes = {}
    static defaultProps = {}
}
