import React from 'react';
import "./PlayForm.less"
import {message,Input,Tabs,Icon} from "antd";
import {StreamLive} from "../../service/channel";
import {apiDomin} from "../../config/apiconfig";

export default class PlayForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            playUrl:{}
        }

    }


    componentDidMount() {
        this.loadChannel();
    }



    loadChannel = (params) => {
        const {channel} = this.props;
        StreamLive(channel.mediaServerId,channel.mainId).then(res => {
			if(res._success && res._statusCode === 200 && res.data)
			{
				this.setState({
                    playUrl:{
                        flv:`${apiDomin}/`+channel.app+'/'+channel.mainId+'.flv',
                        hls:`${apiDomin}/`+channel.app+'/'+channel.mainId+'/hls.m3u8',
                        rtmp:`${apiDomin}/`+channel.app+'/'+channel.mainId,
                        rtsp:`${apiDomin}/`+channel.app+'/'+channel.mainId,
                    }
                })
			}
        })
    }


    render() {
        return (
            <div className={"playback-play-container"}>

                <div className={"playback-play-header"}>
                    <div className={"playback-player"}>
                        {
                          <live-player 
                            video-title='AKStream'
                            video-url={this.state.playUrl.flv}  // 视频url
                            fluent = 'true' // 流畅模式
                            live='true' // 是否直播, 标识要不要显示进度条
                            stretch='true' // 是否拉伸
                            muted='true'
                            autoplay='true'
                            controls={true}> 
                          </live-player> 
                        }

                    </div>
                    <div className={"playback-calendar"}>
                        <Tabs>
                            <Tabs.TabPane tab="分享地址&视频源地址" key="1">
                                <div className={"zpplayer-bottom-tab-pane"}>
                                    <div>
                                        <div>分享地址：</div>
                                        <div><Input value={location.href} addonAfter={<Icon type="copy"/>}/></div>
                                    </div>
                                    <div>
                                        <div>iframe：</div>
                                        <div><Input value={`<iframe src="${location.href}&iframe=yes&aspect=640x360" width="640" height="360" allowfullscreen allow="autoplay"></iframe>`} addonAfter={<Icon type="copy"/>}/></div>
                                    </div>
                                    <div>
                                        <div>flv：</div>
                                        <div><Input value={this.state.playUrl.flv} addonAfter={<Icon type="copy"/>}/></div>
                                    </div>
                                    <div>
                                        <div>rtsp：</div>
                                        <div><Input value={this.state.playUrl.rtsp} addonAfter={<Icon type="copy"/>}/></div>
                                    </div>
                                    <div>
                                        <div>rtmp：</div>
                                        <div><Input value={this.state.playUrl.rtmp} addonAfter={<Icon type="copy"/>}/></div>
                                    </div>
                                    <div>
                                        <div>hls：</div>
                                        <div><Input value={this.state.playUrl.hls} addonAfter={<Icon type="copy"/>}/></div>
                                    </div>
                                </div>
                            </Tabs.TabPane>
                        </Tabs>
                           
                    </div>
                </div>

                <div className={"playback-play-bottom"}>
                 

                </div>
            </div>
			
        );

    }


    static contextTypes = {}
    static propTypes = {}
    static defaultProps = {}
}
