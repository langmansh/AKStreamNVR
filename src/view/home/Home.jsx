import React from 'react';
import "./Home.less"
import RvPage from "../../component/RvPage/RvPage";
import {Button, Card, Col, message, Modal, Row} from "antd";
import moment from "moment";
import ThreadLoadRateCharts from "./ThreadLoadRateCharts";
import ThreadDelayCharts from "./ThreadDelayCharts";
import ReactTimeout from "react-timeout";
import {findThreadsLoad, restartZlmediaServer} from "../../service/global";
import ServerTcpSessions from "./ServerTcpSessions";
import MediaServer from "./MediaServer";
import ServerConfigParams from "./ServerConfigParams";
import RvDrawer from "../../component/RvDrawer/RvDrawer"

@ReactTimeout
export default class Home extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;

        //初始化数据队列,确保初始化时有20个数据,值默认为0
        const initTime = moment().subtract(200, 'seconds').valueOf();
        const data = [];
        for (let i = 0; i < 20; i += 1) {
            data.push({
                time: 5000 * i + initTime,
                averageLoad: 0,
                averageDelay: 0,
                detail: []
            });
        }
        this.state = {
            chartsData: data,

        }
    }

    componentDidMount() {
        //每5秒钟获取一次线程负载数据
        this.props.setInterval(this.loadChartsData, 5000)
    }


    loadChartsData = () => {
        const that = this;
        const now = moment();
        findThreadsLoad().then(res => {
            const data = res.data.data;
            const average = list => list.reduce((prev, curr) => prev + curr) / list.length;

            //计算多个线程的平均负载率和平均延时
            const averageLoad = parseFloat(average(data.map(d => d.load)).toFixed(2))
            const averageDelay = Math.floor(average(data.map(d => d.delay)))

            const ret = {
                time: now.valueOf(),
                averageLoad: averageLoad,
                averageDelay,
                detail: res.data
            }
            that.setState((prevState, props) => {
                //新数据入队,旧数据出队
                prevState.chartsData.push(ret);
                prevState.chartsData.shift();
                return {
                    chartsData: prevState.chartsData
                }
            });
        })
    }


    render() {
        return (
            <RvPage className={"home-page"} headerTools={
                <div>
                    {/* <Button icon={"reload"} type="danger" ghost onClick={() => {
                        const config = {
                            title: '提示!',
                            content: "您确定要重启流媒体服务吗",
                            type: 'confirm',
                            okText: '确定',
                            okType: 'danger',
                            cancelText: '放弃',
                            okCancel: true,
                            onOk: () => {
                                restartZlmediaServer().then((res) => {
                                    if (res.code == 0) {
                                        message.info(res.msg);
                                    }
                                })
                            }
                        };
                        return Modal.confirm(config);
                    }}>重启服务</Button> */}

                    <Button icon={"setting"} type="primary" ghost onClick={() => {
                        RvDrawer.open({
                            width: 920,
                            title: `ZLMedia NVR配置参数`,
                        }, <ServerConfigParams/>)
                    }}>配置参数</Button>
                </div>
            }>
                <Row gutter={24}>

                    <Col span={12} style={{marginBottom: 10}}>
                        <Card className={"dashboard-card"} title="平均线程负载率(%)" bodyStyle={{padding: "20px"}}>
                            <ThreadLoadRateCharts chartData={this.state.chartsData}/>
                        </Card>
                    </Col>
                    <Col span={12} style={{marginBottom: 10}}>
                        <Card className={"dashboard-card"} title="线程任务执行延时(ms)" bodyStyle={{padding: "20px"}}>
                            <ThreadDelayCharts chartData={this.state.chartsData}/>
                        </Card>
                    </Col>

                    <Col span={24} style={{marginBottom: 10}}>
                        <Card className={"dashboard-card"} title="流媒体服务" bodyStyle={{padding: "0px"}} extra={
                            <div>
                                <Button icon={"reload"} onClick={()=>this.mediaServer.loadMediaServerData()}></Button>
                            </div>
                        }>
                            <MediaServer ref={(comp) => this.mediaServer = comp}/>
                        </Card>
                    </Col>

                    <Col span={24} style={{marginBottom: 10}}>
                        <Card className={"dashboard-card"} title="会话列表" bodyStyle={{padding: "0px"}} extra={
                            <div>
                                <Button icon={"reload"} onClick={()=>this.serverTcpSessions.loadServerTcpSessionsData()}></Button>
                            </div>
                        }>
                            <ServerTcpSessions ref={(comp) => this.serverTcpSessions = comp}/>
                        </Card>
                    </Col>
                </Row>
            </RvPage>
        );
    }

    static propTypes = {}
    static defaultProps = {}
}
