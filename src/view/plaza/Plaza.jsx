import React from 'react';
import "./Plaza.less"
import RvPage from "../../component/RvPage/RvPage";
import {findChannels} from "../../service/channel";
import {OnlineStreamInfoList} from "../../service/channel";
import {List} from "antd";
import {apiDomin} from "../../config/apiconfig";
import {secret} from "../../config/apiconfig";
import RvImage from "../../component/RvImage/RvImage";
import black from "../../style/black.png"


export default class Plaza extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;
        this.state = {
            data: [],
            dataTotal: 0,
            page: 1,
            pageSize: 9999,
        }
    }

    componentDidMount() {
        this.loadChanelsData()
    }

    loadChanelsData = (params) => {
		OnlineStreamInfoList({
		    pageIndex: this.state.page,
		    pageSize: this.state.pageSize,
		    // active: 1,
		    ...params
		}).then(res => {
		    this.setState({
		        data: res.data.videoChannelMediaInfo,
		        dataTotal: res.data.total,
		        page: res.data.request.pageIndex,
		        pageSize: res.data.request.pageSize,
		    })
		})
    }

    render() {
        return (
            <RvPage className={"home-page"} noHeader={true}>
                <List
                    className={"channel-py-list"}

                    pagination={false}
                    dataSource={this.state.data}
                    renderItem={(item) => {
                        let snapshotPath = `${apiDomin}/index/api/getSnap?secret=${secret}&timeout_sec=10&expire_sec=30&url=`;
                        if (item.vhost && item.vhost != "__defaultVhost__") {
                            snapshotPath += item.vhost;
                        }
						console.log(snapshotPath)
                        // snapshotPath += "/"+ item.app+"/"+item.stream+".png"
						snapshotPath += `${apiDomin}/`+item.app+"/"+item.mediaServerStreamInfo.stream+".flv"
                        return (
                            <List.Item className={"channel-py"}>
                                <div className={"channel-py-snap"} onClick={()=>{
                                    const w=window.open('about:blank');
                                    w.location.href=`/play?vhost=${item.vhost}&app=${item.app}&stream=${item.mediaServerStreamInfo.stream}`;
                                }}>
                                    <RvImage src={snapshotPath} fallbackSrc={black}/>
                                </div>
                                <div className={"channel-py-des"}>
                                    <span>[流ID]{item.mediaServerStreamInfo.stream}  [名称]{item.channelName}</span>
                                    {/*<span>在线</span>*/}
                                </div>
                            </List.Item>
                        )
                    }}
                />
            </RvPage>
        );
    }

    static propTypes = {}
    static defaultProps = {}
}
