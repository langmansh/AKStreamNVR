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
                        flv:`${apiDomin}/`+channel.app+'/'+channel.mainId+'.live.flv',
                        hls:`${apiDomin}/`+channel.app+'/'+channel.mainId+'/hls.m3u8',
                        rtmp:`${apiDomin}/`+channel.app+'/'+channel.mainId,
                        rtsp:`${apiDomin}/`+channel.app+'/'+channel.mainId,
                    }
                })
			}
        })
    }


    render() {
        let player = new WasmPlayer(null, 'video', this.callbackfun,{
            Height:true
        })
        player.play(this.state.playUrl.flv, 1)
        return (
            <div className={"playback-play-container"}>

                <div className={"playback-play-header"}>
                    <div className={"playback-player"}>
                        <div id='video'></div>
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
                                        <div><Input value={this.state.playUrl.rtsp == null ? null : this.state.playUrl.rtsp.replace('http','rtsp')} addonAfter={<Icon type="copy"/>}/></div>
                                    </div>
                                    <div>
                                        <div>rtmp：</div>
                                        <div><Input value={this.state.playUrl.rtmp == null ? null : this.state.playUrl.rtmp.replace('http','rtmp')} addonAfter={<Icon type="copy"/>}/></div>
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
